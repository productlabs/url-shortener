import { InterfaceLink, Route } from '../types'
import { isSlug } from '../utilities/is-slug'
import { sha256 } from '../utilities/sha-256'

export const slug: Route<Response> = async ({ pathname, method }) => {
  const _slug = pathname.slice(1)

  if (!(isSlug(_slug) && method === 'GET')) {
    return false
  }

  const id = await sha256(_slug)
  const linkJSON = await KV.get(id)

  if (linkJSON === null) {
    return false
  }

  const link: InterfaceLink = JSON.parse(linkJSON)
  const long_url = encodeURI(link.long_url)

  const body = [
    '<html>',
    '<head><title>Links</title></head>',
    `<body><a href="${long_url}">moved here</a></body>`,
    '</html>'
  ].join('\n')

  return new Response(body, {
    headers: {
      'content-type': 'text/html; charset=utf-8',
      location: encodeURI(long_url)
    },
    status: link.code
  })
}
