// @flow

import { commitMutation, graphql, } from 'react-relay'
import environment from '../Environment'

const mutation = graphql`
  mutation SignUpMutation($input: SignUpInput!) {
    signUp(input: $input) {
      token
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

export default (email: string, password: string, cb: Function) => {
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
      onCompleted: (data) => { cb(data.signUp) },
      onError: (err) => { console.error(err) },
    },
  )
}
