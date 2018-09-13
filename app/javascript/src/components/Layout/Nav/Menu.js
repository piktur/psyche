// @flow

import * as React from 'react'
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft'
import ChevronRightIcon from '@material-ui/icons/ChevronRight'
import DashboardIcon from '@material-ui/icons/Dashboard'
import Divider from '@material-ui/core/Divider'
import Drawer from '@material-ui/core/Drawer'
import IconButton from '@material-ui/core/IconButton'
import List from '@material-ui/core/List'
import NavItem from '../Nav/NavItem'
import { withStyles } from '@material-ui/core/styles'

const menuItems = [
  {
    to: '/',
    icon: <DashboardIcon />,
    primary: 'Home'
  },
]

const styles = theme => ({
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: `0 ${theme.spacing.unit}px`,
    ...theme.mixins.toolbar,
  },
  drawerPaper: {
    width: theme.appDrawer.width,
    [theme.breakpoints.up('md')]: {
      position: 'relative',
    },
  },
})

type Props = {
  classes: Object,
  theme: Object,
  onClose: (event: SyntheticMouseEvent<HTMLButtonElement>) => void,
  open: boolean,
  width: number,
}

class Menu extends React.Component<Props> {
  handleKeyDown = (e) => {
    if (this.props.open && (e.key === 'Escape' || e.keyCode === 27)) {
      this.props.onClose(e)
    }
  }

  render() {
    const { classes, theme } = this.props

    return (
      <Drawer
        variant="temporary"
        anchor={theme.direction === 'rtl' ? 'right' : 'left'}
        open={this.props.open}
        onClose={this.props.onClose}
        onKeyDown={this.handleKeyDown}
        classes={{ paper: classes.drawerPaper }}
        ModalProps={{
          keepMounted: true, // Improve mobile performance
        }}
      >
        <div className={classes.drawerHeader}>
          <IconButton onClick={this.props.onClose}>
            {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
          </IconButton>
        </div>

        <Divider />

        <List>
          {menuItems.map(
            (ownProps, i) => <NavItem key={i} onClick={this.props.onClose} {...ownProps} />
          )}
        </List>
      </Drawer>
    )
  }
}

export default withStyles(styles, { withTheme: true })(Menu)
