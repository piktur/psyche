// @flow

import * as React from 'react'
import { createFragmentContainer, graphql } from 'react-relay'
import { MuiThemeProvider, withStyles } from '@material-ui/core/styles'
import CssBaseline from '@material-ui/core/CssBaseline'
import Nav from './Nav/Nav'
import Loader from '../Loader'
import theme from '../../theme'

const styles = theme => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
  },
})

type Props = {
  classes: Object,
  children?: React.Node,
  viewer: {
    role: string,
    isAuthenticated: boolean,
  },
  isLoading?: boolean,
}

function Layout(props: Props): MuiThemeProvider {
  const { classes } = props

  return (
    <MuiThemeProvider theme={theme}>
      <CssBaseline />
      <div className={classes.root}>
        <Nav viewer={props.viewer || Layout.defaultProps.viewer} />
        {props.isLoading ? <Loader /> : props.children}
      </div>
    </MuiThemeProvider>
  )
}

Layout.defaultProps = {
  viewer: {
    role: null,
    isAuthenticated: false,
  }
}

export default createFragmentContainer(withStyles(styles)(Layout), graphql`
  fragment Layout_viewer on Viewer {
    role
    isAuthenticated
    ...Nav_viewer
  }
`)
