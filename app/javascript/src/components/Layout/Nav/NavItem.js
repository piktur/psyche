// @flow

import * as React from 'react'
import { withRouter } from 'found'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import { SvgIcon } from '@material-ui/core'
import type { routerShape } from 'found/lib/PropTypes'

type Props = {
  classes?: Object,
  icon?: React.Element<SvgIcon>,
  onClick?: Function,
  primary: string,
  router: routerShape,
  secondary?: string,
  to: string,
}

// @see https://github.com/mui-org/material-ui/blob/57e463dc67779dbd2de995b3fb6042793fcff5f3/docs/src/pages/guides/composition/composition.md#caveat-with-inlining
class NavItem extends React.Component<Props> {
  handleClick = (e: SyntheticMouseEvent<HTMLButtonElement>): void => {
    const { onClick, router, to } = this.props

    if (typeof onClick === 'function') {
      onClick(e)
    }

    router.push(to)
  }

  render() {
    const { icon, primary, secondary } = this.props

    return (
      <ListItem button onClick={this.handleClick}>
        {icon && <ListItemIcon>{icon}</ListItemIcon>}
        <ListItemText inset primary={primary} secondary={secondary} />
      </ListItem>
    )
  }
}

export default withRouter(NavItem)
