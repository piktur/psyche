// @flow

import * as React from 'react'
import { createFragmentContainer, graphql } from 'react-relay'
import Layout from './components/Layout/Layout'

type Props = {
  isLoading: boolean,
  viewer: ?{
    role: ?string,
    isAuthenticated: boolean,
  },
}

const App = (props: Props): Layout => {
  return <Layout {...props} isLoading={props.isLoading} />
}

export default createFragmentContainer(App, graphql`
  fragment App_viewer on Viewer {
    role
    isAuthenticated
    ...Layout_viewer
  }
`)
