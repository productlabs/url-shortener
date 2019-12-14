export const PRESHARED_KEY = 'mypresharedkey'
export const REGEXP_SYMBOL_WITH_COMBINING_MARKS = /(\P{Mark})(\p{Mark}+)/gu
export const REGEXP_LINK_SLUG_PREFIXED = /^\/v1\/link\/[-_\p{Alphabetic}\p{Mark}\p{Decimal_Number}\p{Connector_Punctuation}\p{Join_Control}\p{Number}(\p{Emoji_Modifier_Base}\p{Emoji_Modifier}?|\p{Emoji_Presentation}|\p{Emoji}\uFE0F)]+$/u
export const REGEX_LINK_SLUG = /^[-_\p{Alphabetic}\p{Mark}\p{Decimal_Number}\p{Connector_Punctuation}\p{Join_Control}\p{Number}(\p{Emoji_Modifier_Base}\p{Emoji_Modifier}?|\p{Emoji_Presentation}|\p{Emoji}\uFE0F)]+$/u
export const LINK_LENGTH_MIN = 3
export const LINK_LENGTH_MAX = 15

export const ERROR_BAD_REQUEST = () =>
  new Response(undefined, {
    status: 400
  })

export const ERROR_FORBIDDEN = () =>
  new Response(undefined, {
    status: 403
  })

export const ERROR_NOT_FOUND = () =>
  new Response(undefined, {
    status: 404
  })
