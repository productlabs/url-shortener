import { KVNamespace } from '@cloudflare/workers-types'

declare global {
  const KV: KVNamespace
}

export interface InterfaceLink {
  id: string
  code: 301 | 302 | 307
  slug: string
  long_url: string
}

export type Route<T = unknown> = (
  properties: RouteProperties
) => false | T | Promise<false | T>

export interface RouteProperties {
  pathname: string
  method: string //  | 'PUT' | 'GET' | 'DELETE' | 'POST'
  // searchParams: { [key: string]: string }
  request: Request
}
