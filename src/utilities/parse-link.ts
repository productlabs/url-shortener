import { assign, includes, reduce, isNumber } from 'lodash'
import { InterfaceLink } from '../types'
import { isSlug } from './is-slug'
import { parseURL } from './parse-url'
import { sha256 } from './sha-256'

export const parseLink = async (
  body: string,
  options = {
    checkSlug: true,
    setId: true
  }
): Promise<false | InterfaceLink> => {
  let link: InterfaceLink

  try {
    link = JSON.parse(body)
  } catch {
    return false
  }

  const long_url = parseURL(link.long_url)
  const code = isNumber(link.code) ? link.code : 301

  const status = reduce<boolean, boolean>(
    [
      long_url !== false,
      includes([301, 302, 307], code),
      options.checkSlug === true ? isSlug(link.slug) : true
    ],
    (acc, curr) => acc && curr,
    true
  )

  return status === false
    ? false
    : assign(
        link,
        options.checkSlug && options.setId
          ? { id: await sha256(link.slug) }
          : {},
        long_url === false ? {} : { long_url: decodeURI(long_url.href) },
        { code }
      )
}
