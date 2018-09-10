// @flow

import * as React from 'react'
import { withStyles } from '@material-ui/core/styles'
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles'
import { indigo, red } from '@material-ui/core/colors'
import CssBaseline from '@material-ui/core/CssBaseline'
import Nav from './Nav/Nav'

const theme = createMuiTheme({
  appDrawer: {
    width: 240,
    breakpoint: 'md',
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
})

const styles = theme => ({
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing.unit * 3,
  },
})

type Props = {
  classes: Object,
  children?: React.Node,
}

export default function(props: Props): MuiThemeProvider {
  let Layout = function(props: Props): React.Element<'div'> {
    const { classes, ...other } = props

    return (
      <div className={classes.background}>
        <Nav {...other} />

        <main className={classes.content}>
          {props.children}
        </main>
      </div>
    )
  }
  Layout = withStyles(styles)(Layout)

  return (
    <MuiThemeProvider theme={theme}>
      <CssBaseline />
      <Layout {...props} />
    </MuiThemeProvider>
  )
}
