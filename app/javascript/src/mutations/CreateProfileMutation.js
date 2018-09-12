// @flow

import { commitMutation, graphql } from 'react-relay'
import environment from '../Environment'

const mutation = graphql`
  mutation CreateProfileMutation($input: CreateProfileInput!) {
    createProfile(input: $input) {
      profile {
        firstName
        lastName
        birthday
      }
      errors {
        message
        path
      }
    }
  }
`

export default (profile: Object, cb: Function) => {
  const variables = {
    input: {
      ...profile,
      clientMutationId: '',
    }
  }

  commitMutation(
    environment,
    {
      mutation,
      variables,
      onCompleted: (data) => { cb(data.createProfile) },
      onError: (err) => { console.error(err) }
    }
  )
}
