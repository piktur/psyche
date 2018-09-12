// @flow

import * as React from 'react'
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
          <Typography component="div" className={classes.chartContainer}>
          </Typography>

          <Typography variant="display1" gutterBottom>
            Products
          </Typography>

          <div className={classes.tableContainer}>
            <Table />
          </div>
        </main>
      </div>
    )
  }
}

export default withStyles(styles)(Dashboard)
