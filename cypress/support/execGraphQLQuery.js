const axios = require('axios')

async function setup() {
  try {
    const { data } = await axios({
      url: 'http://localhost:3000/graphql',
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.TOKEN}`
      },
      data: {
        query: `mutation SetupMutation(
          $input: SetupInput!
        ) {
          setup(input: $input) {
            customerToken
          }
        }`,
        variables: {
          input: {
            validFor: 100000
          }
        },
      }
    })
  } catch (err) {
    throw err
  }
}
