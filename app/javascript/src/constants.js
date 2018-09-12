// @flow

export const GRAPHQL_URL: ?string = process.env.GRAPHQL_URL
export const AUTH_TOKEN = 'viewer_token'
export const AUTH_ENTITY = 'viewer'
export const ROLES: [string, string, string, string] = ['customer', 'clinic', 'clinician', 'admin']

if (!GRAPHQL_URL) {
  throw Error('GRAPHQL_URL undefined')
}
