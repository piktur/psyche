// @flow

export const AUTH_TOKEN = Object.freeze('viewer_token')
export const AUTH_ENTITY = Object.freeze('viewer')
export const ROLES = Object.freeze([
  Object.freeze('customer'),
  Object.freeze('clinic'),
  Object.freeze('clinician'),
  Object.freeze('admin')
])
export type Role = 'customer' | 'clinic' | 'clinician' | 'admin'

export const GRAPHQL_URL: ?string = process.env.GRAPHQL_URL
if (!GRAPHQL_URL) {
  throw Error('GRAPHQL_URL undefined')
}
