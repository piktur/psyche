// @flow

import axios from 'axios'
import {
  Environment,
  Network,
  RecordSource,
  Store,
  ViewerHandler
} from 'relay-runtime'
import type { Handler } from 'react-relay'
import { AUTH_TOKEN } from './constants'
import { installRelayDevTools } from 'relay-devtools'

type Handlers = { [string]: ?Handler }

const handlers: Handlers = { }

const handlerProvider = (handle: string): Handler => {
  // @example
  //  viewer @__clientField(handle: "viewer")
  if (handle === 'viewer') return ViewerHandler
  const handler = handlers[handle]
  if (handler != null) return handler
  throw new Error(`handlerProvider: No handler provided for ${handle}`)
}

async function fetchQuery(operation, variables) {
  const token: ?string = localStorage.getItem(AUTH_TOKEN)
  const headers: { [string]: string } = {
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

if (process.env.NODE_ENV !== 'production') {
  installRelayDevTools()
}

export default new Environment({
  network: Network.create(fetchQuery),
  store: new Store(new RecordSource()),
  handlerProvider,
})
