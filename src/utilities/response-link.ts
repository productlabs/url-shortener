import { InterfaceLink } from '../types'

export const responseLink = (link: InterfaceLink) =>
  new Response(`${JSON.stringify(link, null, '  ')}`, {
    headers: { 'content-type': 'application/json;charset=utf-8' },
    status: 200
  })
