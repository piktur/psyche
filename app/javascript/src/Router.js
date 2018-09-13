// @flow

import * as React from 'react'
import { BrowserProtocol, queryMiddleware } from 'farce'
import { Resolver } from 'found-relay'
import { matchShape } from 'found/lib/PropTypes'
import createFarceRouter from 'found/lib/createFarceRouter'
import createRender from 'found/lib/createRender'
import makeRouteConfig from 'found/lib/makeRouteConfig'
import Route from 'found/lib/Route'
import { graphql } from 'react-relay'
import environment from './Environment'

import App from './App'
import ProtectedRoute from './pages/ProtectedRoute'
import ErrorPage from './pages/Error'
import IndexPage from './pages/Index'
import Profile from './pages/Profile/Profile'
import SignIn from './pages/SignIn/SignIn'
import CustomerPage from './pages/Customer/Customer'
import ClinicPage from './pages/Clinic/Clinic'
import ClinicianPage from './pages/Clinician/Clinician'
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
      role
      isAuthenticated
      ...Dashboard_viewer @relay(mask: true)
    }
  }
`

const customerQuery = graphql`
  query Router_CustomerQuery {
    viewer {
      role
      isAuthenticated
      ...Customer_viewer @relay(mask: true)
    }
  }
`

const clinicQuery = graphql`
  query Router_ClinicQuery {
    viewer {
      role
      isAuthenticated
      ...Clinic_viewer @relay(mask: true)
    }
  }
`

const clinicianQuery = graphql`
  query Router_ClinicianQuery {
    viewer {
      role
      isAuthenticated
      ...Clinician_viewer @relay(mask: true)
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
    <ProtectedRoute path="admin" Component={Dashboard} query={dashboardQuery} />
    <ProtectedRoute path="customer" Component={CustomerPage} query={customerQuery} />
    <ProtectedRoute path="clinic" Component={ClinicPage} query={clinicQuery} />
    <ProtectedRoute path="clinician" Component={ClinicianPage} query={clinicianQuery} />
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
