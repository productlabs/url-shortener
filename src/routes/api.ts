import { assign, omit } from 'lodash'
import {
  ERROR_BAD_REQUEST,
  ERROR_NOT_FOUND,
  REGEXP_LINK_SLUG_PREFIXED,
  ERROR_FORBIDDEN,
  PRESHARED_KEY
} from '../constants'
import { InterfaceLink, Route } from '../types'
import { isSlug } from '../utilities/is-slug'
import { parseLink } from '../utilities/parse-link'
import { responseLink } from '../utilities/response-link'
import { sha256 } from '../utilities/sha-256'

const isAuthorized = (request: Request) => {
  const psk = request.headers.get('Authorization')

  if (psk === PRESHARED_KEY) {
    return true
  }

  return false
}

export const API = (
  options = {
    prefix: '/v1/link',
    regexp: REGEXP_LINK_SLUG_PREFIXED
  }
): Array<Route<Response>> => [
  async ({ pathname, method, request }) => {
    if (!(method === 'POST' && pathname === options.prefix)) {
      return false
    }

    if (!isAuthorized(request)) {
      return ERROR_FORBIDDEN()
    }

    const body = await request.text()

    const link = await parseLink(body, {
      checkSlug: true,
      setId: true
    })

    if (link === false) {
      return ERROR_BAD_REQUEST()
    }

    if ((await KV.get(link.id)) !== null) {
      return ERROR_BAD_REQUEST()
    }

    await KV.put(link.id, JSON.stringify(link))

    return responseLink(link)
  },
  async ({ pathname, method, request }) => {
    if (!options.regexp.test(pathname)) {
      return false
    }

    if (!isAuthorized(request)) {
      return ERROR_FORBIDDEN()
    }

    const slug = pathname.slice(options.prefix.length + 1)

    if (!isSlug(slug)) {
      return ERROR_BAD_REQUEST()
    }

    const id = await sha256(slug)
    const linkJSON = await KV.get(id)

    if (linkJSON === null) {
      return ERROR_NOT_FOUND()
    }

    const currentLink: InterfaceLink = JSON.parse(linkJSON)

    if (method === 'GET') {
      return responseLink(currentLink)
    } else if (method === 'DELETE') {
      await KV.delete(id)

      return new Response(undefined, { status: 204 })
    } else if (method === 'PUT') {
      const body = await request.text()
      const newLink = await parseLink(body, {
        checkSlug: false,
        setId: false
      })

      if (newLink === false) {
        return ERROR_BAD_REQUEST()
      }

      const link = assign(currentLink, omit(newLink, ['slug', 'id']))

      await KV.put(link.id, JSON.stringify(link))

      return responseLink(link)
    }

    return false
  }
]
