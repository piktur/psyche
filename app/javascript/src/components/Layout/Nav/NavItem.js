// @flow

import * as React from 'react'
import { Link } from 'found'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import { SvgIcon } from '@material-ui/core'

type Props = {
  classes?: Object,
  icon?: React.Element<SvgIcon>,
  primary: string,
  secondary?: string,
  to: string,
}

// @see https://github.com/mui-org/material-ui/blob/57e463dc67779dbd2de995b3fb6042793fcff5f3/docs/src/pages/guides/composition/composition.md#caveat-with-inlining
class NavItem extends React.Component<Props> {
  renderLink = (itemProps: Object) => (
    <Link to={this.props.to} {...itemProps} />
  )

  render() {
    const { icon, primary, secondary } = this.props

    return (
      <ListItem button component={this.renderLink}>
        {icon && <ListItemIcon>{icon}</ListItemIcon>}
        <ListItemText inset primary={primary} secondary={secondary} />
      </ListItem>
    )
  }
}

export default NavItem
