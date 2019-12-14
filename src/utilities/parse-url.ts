import { isString } from 'lodash'

export const parseURL = (value: unknown) => {
  if (!isString(value)) {
    return false
  }

  let url: URL

  try {
    url = new URL(value)
  } catch {
    return false
  }

  const protocol = url.protocol.slice(0, -1)

  /**
   * We only use https and we do not downgrade
   */
  if (protocol !== ('https' as const)) {
    return false
  }

  return url
}
