import { inRange } from 'lodash'
import { LINK_LENGTH_MAX, LINK_LENGTH_MIN, REGEX_LINK_SLUG } from '../constants'
import { countSymbols } from './count-symbols'

export const isSlug = (value: string) =>
  REGEX_LINK_SLUG.test(value) &&
  inRange(countSymbols(value), LINK_LENGTH_MIN, LINK_LENGTH_MAX + 1)
