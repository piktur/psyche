// @flow

import { commitMutation, graphql } from 'react-relay'
import environment from '../Environment'

const mutation = graphql`
  mutation AuthenticateMutation($input: AuthenticateInput!) {
    authenticate(input: $input) {
      viewer @__clientField(handle: "viewer") {
        id
        role
        token
        isAuthenticated
      }
      errors {
        message
        path
      }
    }
  }
`

export default (email: string, password: string, cb: Function) => {
  const variables = {
    input: {
      email,
      password,
      clientMutationId: '',
    }
  }

  commitMutation(
    environment,
    {
      mutation,
      variables,
      onCompleted: (data) => {
        if (data) {
          const { authenticate } = data
          cb(authenticate, authenticate.errors)
        } else {
          throw Error('UNEXPECTED_RESPONSE')
        }
      },
      onError: (err) => { console.error(err) }
    }
  )
}
