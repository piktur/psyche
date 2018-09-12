// @flow

import * as React from 'react'
import { createFragmentContainer, graphql } from 'react-relay'
import { MuiThemeProvider, createMuiTheme, withStyles } from '@material-ui/core/styles'
import { indigo, red } from '@material-ui/core/colors'
import CssBaseline from '@material-ui/core/CssBaseline'
import Nav from './Nav/Nav'
import Loader from '../Loader'

const theme = createMuiTheme({
  mixins: {
    deductToolbarHeight() {
      const styles = { height: `calc(100vh - ${this.toolbar.minHeight}px)` }
      Object.keys(this.toolbar).forEach((e) => {
        if (/^@media/.test(e)) {
          const { [e]: { minHeight } } = this.toolbar
          styles[e] = { height: `calc(100vh - ${minHeight}px)` }
        }
      })
      return styles
    },
    background(img) {
      return {
        background: `url('${img}')`,
        backgroundSize: 'cover',
        '&:after': {
          content: '\'\'',
          position: 'relative',
          top: 0,
          right: 0,
          bottom: 0,
          left: 0,
          backgroundImage: 'linear-gradient(20deg, rgb(219, 112, 147), rgb(218, 163, 87))',
          opacity: 0.6,
        },
      }
    },
  },
  palette: {
    primary: {
      light: indigo[300],
      main: indigo[500],
      dark: indigo[700],
    },
    secondary: {
      light: indigo[300],
      main: indigo[500],
      dark: indigo[700],
    },
    error: {
      light: red[300],
      main: red[500],
      dark: red[700],
    },
  },
  appDrawer: {
    width: 240,
    breakpoint: 'md',
  },
})

const styles = theme => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
  },
})

type Props = {
  classes: Object,
  children?: React.Node,
  viewer?: {
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
