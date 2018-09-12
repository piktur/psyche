// @flow

import * as React from 'react'
import { createFragmentContainer, graphql } from 'react-relay'
import { withRouter } from 'found'
import AppBar from '@material-ui/core/AppBar'
import Menu from './Menu'
import IconButton from '@material-ui/core/IconButton'
import LockIcon from '@material-ui/icons/Lock'
import LockOpenIcon from '@material-ui/icons/LockOpen'
import MenuIcon from '@material-ui/icons/Menu'
import Toolbar from '@material-ui/core/Toolbar'
import { withStyles } from '@material-ui/core/styles'
import { AUTH_TOKEN, AUTH_ENTITY } from '../../../constants'
import LogOutMutation from '../../../mutations/LogOutMutation'

const styles: Object = theme => ({
  root: {
    flexGrow: 1,
  },
  flex: {
    flexGrow: 1,
  },
  appBar: {
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
})

type Props = {
  classes: Object,
  router: Object,
  viewer: {
    role?: string,
    isAuthenticated?: boolean,
  },
}

type State = {
  open: boolean,
}

class Nav extends React.Component<Props, State> {
  state = {
    open: false,
  }

  handleClickMenuToggle = () => {
    this.setState((prevState) => ({ open: !prevState.open }))
  }

  handleClickAuthToggle = () => {
    const { viewer, router } = this.props

    if (viewer && viewer.isAuthenticated) {
      LogOutMutation(() => {
        localStorage.removeItem(AUTH_ENTITY)
        localStorage.removeItem(AUTH_TOKEN)
        router.replace('/')
      })
    } else {
      router.push('/login')
    }
  }

  render() {
    const { classes, viewer } = this.props
    const isAuthenticated = viewer.isAuthenticated

    return (
      <React.Fragment>
        <AppBar className={classes.appBar} position="static">
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="Menu"
              onClick={this.handleClickMenuToggle}
            >
              <MenuIcon />
            </IconButton>

            <span className={classes.flex}></span>

            <IconButton
              color="inherit"
              aria-label={isAuthenticated ? 'Sign Out': 'Sign In'}
              onClick={this.handleClickAuthToggle}
            >
              {isAuthenticated ? <LockOpenIcon /> : <LockIcon />}
            </IconButton>
          </Toolbar>
        </AppBar>

        <Menu
          onClose={this.handleClickMenuToggle}
          open={this.state.open}
        />
      </React.Fragment>
    )
  }
}

export default createFragmentContainer(withRouter(withStyles(styles)(Nav)), graphql`
  fragment Nav_viewer on Viewer {
    role
    isAuthenticated
  }
`)
