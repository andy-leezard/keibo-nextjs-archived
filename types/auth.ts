import { StringDecoder } from "string_decoder"

export type AuthAccessResponseToken = {
  access: string
}

export type AuthResponseTokens = AuthAccessResponseToken & {
  refresh: StringDecoder
}
