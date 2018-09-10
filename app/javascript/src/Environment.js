// @flow

import axios from 'axios'
import {
  Environment,
  Network,
  RecordSource,
  Store
} from 'relay-runtime'
import { AUTH_TOKEN } from './constants'

async function fetchQuery(operation, variables) {
  const token: ?string = localStorage.getItem(AUTH_TOKEN)
  const headers: any = {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
  }

  if (token) {
    headers['Authorization'] = `Bearer ${token}`
  }

  try {
    const { data } = await axios({
      url: '/graphql',
      method: 'POST',
      headers,
      data: {
        query: operation.text,
        variables,
      }
    })

    return data
  } catch (err) {
    throw err
  }
}

export default new Environment({
  network: Network.create(fetchQuery),
  store: new Store(new RecordSource()),
})
