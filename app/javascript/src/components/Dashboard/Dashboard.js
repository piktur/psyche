// @flow

import * as React from 'react'
import { createFragmentContainer, graphql } from 'react-relay'
import Table from './Table'
import Typography from '@material-ui/core/Typography'
import { withStyles } from '@material-ui/core/styles'

const styles = (theme) => ({
  root: {
    display: 'flex',
    padding: theme.spacing.unit * 3,
    ...theme.mixins.deductToolbarHeight(theme),
  },
  content: {
    flexGrow: 1,
    overflow: 'auto',
  },
  chartContainer: {
    marginLeft: -22,
  },
  tableContainer: {
    height: 320,
  },
})

type Props = {
  classes: Object,
}

class Dashboard extends React.Component<Props> {
  render() {
    const { classes } = this.props

    return (
      <div className={classes.root}>
        <main className={classes.content}>
          <Typography component="div" className={classes.chartContainer} gutterBottom>
            Admin
          </Typography>

          <div className={classes.tableContainer}>
          </div>
        </main>
      </div>
    )
  }
}

export default createFragmentContainer(withStyles(styles)(Dashboard), graphql`
  fragment Dashboard_viewer on Viewer {
    role
    isAuthenticated
  }
`)
