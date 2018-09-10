// @flow

import React from 'react'
import ReactDOM from 'react-dom'
import { QueryRenderer, createFragmentContainer, graphql } from 'react-relay'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import environment from './Environment'
import Dashboard from './components/Dashboard/Dashboard'
import Fade from '@material-ui/core/Fade'
import Layout from './components/Layout/Layout'
import IndexPage from './pages/IndexPage'
import Loader from './components/Loader'
import SignIn from './components/SignIn/SignIn'
import Profile from './components/Profile/Profile'
import Typography from '@material-ui/core/Typography'
import 'typeface-roboto'

type Props = {
  viewer: {
    role: number,
    profile: {
      firstName: string,
      lastName: string,
    }
  }
}

class App extends React.Component<Props> {
  render() {
    const { viewer } = this.props

    return (
      <BrowserRouter>
        <Layout classes={{}} viewer={viewer}>
          <Switch>
            <Route exact path="/" component={viewer ? Dashboard : IndexPage} />
            <Route exact path="/login" component={SignIn}/>
            <Route exact path="/profile" component={Profile}/>
          </Switch>
        </Layout>
      </BrowserRouter>
    )
  }
}

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(
    <QueryRenderer
      environment={environment}
      query={graphql`
        query AppQuery {
          viewer {
            ...App_viewer
          }
        }
      `}
      variables={{}}
      render={({ error, props }) => {
        if (error) {
          return <Typography variant="display4" gutterBottom>Error!</Typography>
        }

        if (props) {
          return <App viewer={props.viewer}/>
        } else {
          return <Loader />
        }

      }}
    />,
    document.getElementById('app')
  )
})

createFragmentContainer(App, graphql`
  fragment App_viewer on User {
    role
    profile {
      firstName
      lastName
    }
    ...Nav_viewer
  }
`)
