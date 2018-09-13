// @flow

import * as React from 'react'
import { createFragmentContainer, graphql } from 'react-relay'
import withRouter from 'found/lib/withRouter'
import type { routerShape } from 'found/lib/PropTypes'
import { withStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'

const styles = theme => ({
  ...theme.page(),
})

type Props = {
  classes: Object,
  router: routerShape,
}

type State = {

}

class Clinic extends React.Component<Props, State> {
  state = {

  }

  render(): React.Element<any> {
    const { classes } = this.props

    return <div className={classes.root}>
      <main className={classes.content}>
        <Typography variant="display2">Clinic</Typography>
      </main>
    </div>
  }
}

export default createFragmentContainer(withRouter(withStyles(styles)(Clinic)), graphql`
  fragment Clinic_viewer on Viewer {
    role
    isAuthenticated
  }
`)
