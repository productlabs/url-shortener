import 'core-js/stable'
import { ERROR_NOT_FOUND } from './constants'
import { API } from './routes/api'
import { robots } from './routes/robots'
import { slug } from './routes/slug'
import { RouteProperties } from './types'
import { parseURL } from './utilities/parse-url'

export async function handleRequest(request: Request): Promise<Response> {
  const url = parseURL(request.url)

  if (url === false) {
    return ERROR_NOT_FOUND()
  }

  const properties: RouteProperties = {
    method: request.method,
    pathname: unescape(decodeURIComponent(url.pathname)),
    request
    // searchParams: fromPairs(Array.from(url.searchParams))
  }

  const routes = [slug, robots, ...API()]

  let index = 0
  let route: Response | false = false

  while (index < routes.length) {
    route = route === false ? await routes[index](properties) : route

    if (route !== false) {
      break
    }

    index++
  }

  if (route === false) {
    return ERROR_NOT_FOUND()
  }

  return route
}

addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request))
})
