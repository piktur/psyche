// @flow

import { commitMutation, graphql, } from 'react-relay'
import environment from '../Environment'

const mutation = graphql`
  mutation SignUpMutation($input: SignUpInput!) {
    signUp(input: $input) {
      viewer @__clientField(handle: "viewer") {
        id
        role
        token
        isAuthenticated
      }
      user {
        id
        email
        profile {
          firstName
          lastName
        }
      }
      errors {
        message
        path
      }
    }
  }
`

export default (email: string, password: string, onCompleted: Function) => {
  const variables = {
    input: {
      email,
      password,
      clientMutationId: ''
    },
  }

  commitMutation(
    environment,
    {
      mutation,
      variables,
      onCompleted: (data) => {
        if (data) {
          const { signUp } = data
          onCompleted(signUp, signUp.errors)
        } else {
          throw Error('UNEXPECTED_RESPONSE')
        }
      },
      onError: (err) => { console.error(err) },
    },
  )
}
