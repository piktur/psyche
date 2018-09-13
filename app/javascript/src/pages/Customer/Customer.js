// @flow

import * as React from 'react'
import { createFragmentContainer, graphql } from 'react-relay'
import Typography from '@material-ui/core/Typography'
import { withStyles } from '@material-ui/core/styles'
import type { routerShape } from 'found/lib/PropTypes'
import withRouter from 'found/lib/withRouter'

const styles = theme => ({
  ...theme.page(),
})

type Props = {
  classes: Object,
  router: routerShape,
}

type State = {

}

class Customer extends React.Component<Props, State> {
  state = {

  }

  render(): React.Element<any> {
    const { classes } = this.props

    return <div className={classes.root}>
      <main className={classes.content}>
        <Typography variant="display2">Customer</Typography>
      </main>
    </div>
  }
}

export default createFragmentContainer(withRouter(withStyles(styles)(Customer)), graphql`
  fragment Customer_viewer on Viewer {
    role
    isAuthenticated
  }
`)
