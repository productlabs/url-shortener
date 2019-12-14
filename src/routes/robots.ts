import { Route } from '../types'

export const robots: Route<Response> = ({ pathname, method }) => {
  if (!(pathname === '/robots.txt' && method === 'GET')) {
    return false
  }

  return new Response(['User-Agent: *', 'Disallow:'].join('\n'), {
    headers: {
      'content-type': 'text/plain',
      'cache-control': 'max-age=86400'
    },
    status: 200
  })
}
