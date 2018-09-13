// @flow

import * as React from 'react'
import { routerShape } from 'found/lib/PropTypes'
import HTTPError from 'found/lib/HttpError'
import Route from 'found/lib/Route'
import { ROLES } from '../constants'
import type { Role } from '../constants'
import Loader from '../components/Loader'

class UnauthorizedError extends HTTPError {
  constructor(...args) {
    super(args)
    this.name = 'UnauthorizedError'
    this.message = 'You are not authorized to view this page'
    this.status = 401
  }
}

type Props = {
  route: routerShape,
  viewer: {
    role: Role,
    isAuthenticated: boolean,
  }
}

export default class ProtectedRoute extends Route {
  render({ Component, props }: { Component: ?React.Component<any>, props: ?Props }) {
    if (!Component || !props) return <Loader />

    const { viewer, route } = props
    if (viewer && ROLES[viewer.role] !== route.path) {
      throw new UnauthorizedError()
    }

    return (<Component {...props} />)
  }
}
