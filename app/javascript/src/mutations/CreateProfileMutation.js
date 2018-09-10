// @flow

import { commitMutation, graphql } from 'react-relay'
import environment from '../Environment'

// const mutation = graphql`
//   mutation CreateProfileMutation($input: Profile!) {
//     createProfile(input: $input) {
//       firstName
//       lastName
//       birthday
//       user
//       errors {
//         message
//         path
//       }
//     }
//   }
// `

// export default (profile: Object, cb: Function) => {
//   const variables = {
//     input: {
//       ...profile,
//       clientMutationId: '',
//     }
//   }

//   commitMutation(
//     environment,
//     {
//       mutation,
//       variables,
//       onCompleted: (data) => { cb(data.createProfile) },
//       onError: (err) => { console.error(err) }
//     }
//   )
// }
