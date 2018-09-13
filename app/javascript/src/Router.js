// @flow

import * as React from 'react'
import { BrowserProtocol, queryMiddleware } from 'farce'
import makeRouteConfig from 'found/lib/makeRouteConfig'
import Route from 'found/lib/Route'
import { matchShape } from 'found/lib/PropTypes'
import createFarceRouter from 'found/lib/createFarceRouter'
import createRender from 'found/lib/createRender'
import { Resolver } from 'found-relay'
import { graphql } from 'react-relay'
import environment from './Environment'

import App from './App'
import IndexPage from './pages/Index'
import ErrorPage from './pages/Error'
import Profile from './pages/Profile/Profile'
import SignIn from './pages/SignIn/SignIn'
import Dashboard from './components/Dashboard/Dashboard'
import Loader from './components/Loader'

const appQuery = graphql`
  query Router_AppQuery {
    viewer @__clientField(handle: "viewer") {
      ...App_viewer
    }
  }
`

const signInQuery = graphql`
  query Router_SignInQuery {
    viewer {
      ...SignIn_viewer
    }
  }
`

const profileQuery = graphql`
  query Router_LoginQuery {
    viewer {
      ...Profile_viewer
    }
  }
`

const dashboardQuery = graphql`
  query Router_DashboardQuery {
    viewer {
      ...Dashboard_viewer
    }
  }
`

const Root = ({ match, props }: { match: matchShape, props: Object }): App => {
  if (!props) {
    return <Loader />
  }
  return <App {...match} {...props} isLoading={!props} />
}

const routeConfig = makeRouteConfig(
  <Route
    path="/"
    query={appQuery}
    render={Root}
  >
    <Route Component={IndexPage} />
    <Route path="login" Component={SignIn} query={signInQuery} />
    <Route path="signup" Component={SignIn} query={signInQuery} />
    <Route path="profile" Component={Profile} query={profileQuery} />
    <Route path="admin" Component={Dashboard} query={dashboardQuery} />
    <Route path="customer" Component={Dashboard} query={dashboardQuery} />
    <Route path="clinic" Component={Dashboard} query={dashboardQuery} />
    <Route path="clinician" Component={Dashboard} query={dashboardQuery} />
  </Route>
)

const resolver = new Resolver(environment)

const Router = createFarceRouter({
  historyProtocol: new BrowserProtocol(),
  historyMiddlewares: [queryMiddleware],
  routeConfig,
  render: createRender({
    renderError: ({ error }) => <ErrorPage error={error} />,
  }),
})

export default () => <Router resolver={resolver} />
