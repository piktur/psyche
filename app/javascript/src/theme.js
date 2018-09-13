// @flow

import { createMuiTheme } from '@material-ui/core/styles'
import { indigo, red } from '@material-ui/core/colors'

export default createMuiTheme({
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
  page() {
    const { spacing } = this
    return {
      root: {
        display: 'flex',
        padding: spacing.unit * 3,
        overflow: 'auto',
      },
      content: {
        flexGrow: 1,
      },
    }
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
