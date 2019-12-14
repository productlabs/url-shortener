// eslint-disable-next-line node/no-deprecated-api
import punycode from 'punycode'
import { REGEXP_SYMBOL_WITH_COMBINING_MARKS } from '../constants'

/**
 * Big Thanks to @mathias
 * https://mathiasbynens.be/notes/javascript-unicode
 */
export const countSymbols = (string: string): number => {
  // Remove any combining marks, leaving only the symbols they belong to:
  const stripped = string.replace(
    REGEXP_SYMBOL_WITH_COMBINING_MARKS,
    (_, symbol, __) => symbol
  )

  // Account for astral symbols / surrogates, just like we did before:
  return punycode.ucs2.decode(stripped).length
}
