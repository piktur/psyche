// @flow

import { commitMutation, graphql } from 'react-relay'
import environment from '../Environment'

const mutation = graphql`
  mutation LogOutMutation($input: LogOutInput!) {
    logOut(input: $input) {
      viewer @__clientField(handle: "viewer") {
        id
        isAuthenticated
      }
      errors {
        message
        path
      }
    }
  }
`

export default (onCompleted: Function) => {
  const variables = {
    input: {
      clientMutationId: '',
    }
  }

  commitMutation(
    environment,
    {
      mutation,
      variables,
      optimisticUpdater: (store) => {
        store.get('client:root:viewer').setValue(false, 'isAuthenticated')
      },
      onCompleted: (data) => {
        if (data) {
          const { logOut } = data
          onCompleted(logOut, logOut.errors)
        } else {
          throw Error('UNEXPECTED_RESPONSE')
        }
      },
      onError: (err) => { console.error(err) },
    }
  )
}
