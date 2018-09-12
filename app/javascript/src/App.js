// @flow

import React from 'react'
import ReactDOM from 'react-dom'
import { QueryRenderer, createFragmentContainer, graphql } from 'react-relay'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import environment from './Environment'
import Dashboard from './components/Dashboard/Dashboard'
import Layout from './components/Layout/Layout'
import Loader from './components/Loader'
import 'typeface-roboto'
import ErrorPage from './pages/ErrorPage'
import IndexPage from './pages/IndexPage'
import SignIn from './components/SignIn/SignIn'
import Profile from './components/Profile/Profile'

type Props = {
  viewer: {
    role: ?string,
    isAuthenticated: boolean,
  }
}

const App = ({ error, props }: { error: ?Error, props: ?Props }) => {
  if (error) {
    return <ErrorPage error={error.message} />
  }

  if (props) {
    const { viewer } = props

    return (
      <BrowserRouter>
        <Layout classes={{}} viewer={viewer}>
          <Switch>
            <Route exact path="/" component={IndexPage} />
            <Route exact path="/login" component={SignIn} />
            <Route exact path="/sign-up" component={SignIn} />
            <Route exact path="/admin" component={Dashboard} />
            <Route exact path="/customer" component={Dashboard} />
            <Route exact path="/clinic" component={Dashboard} />
            <Route exact path="/clinician" component={Dashboard} />
            <Route exact path="/profile" component={Profile}/>
            <Route component={ErrorPage} />
          </Switch>
        </Layout>
      </BrowserRouter>
    )
  } else {
    return <Loader />
  }
}

const AppQuery = graphql`
  query AppQuery {
    viewer @__clientField(handle: "viewer") {
      ...App_viewer @relay(mask: false)
    }
  }
`

createFragmentContainer(App, graphql`
  fragment App_viewer on Viewer {
    role
    isAuthenticated
    ...Layout_viewer
  }
`)

const render = () => {
  const app = document.getElementById('app')

  if (!app) {
    throw new Error('Root element `#app` missing')
  }

  ReactDOM.render(
    <QueryRenderer
      environment={environment}
      query={AppQuery}
      variables={{}}
      render={App}
    />,
    app
  )
}

document.addEventListener('DOMContentLoaded', render)
