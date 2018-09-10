// @flow

import * as React from 'react'
import Typography from '@material-ui/core/Typography'
import { withStyles } from '@material-ui/core/styles'

const styles: Object = {
  root: {
    flexGrow: 1,
  },
  flex: {
    flexGrow: 1,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
}

type Props = {
  classes: Object
}

function IndexPage(props: Props) {
  const { classes } = props

  return (
    <div className={classes.root}>
      <Typography variant="display4" gutterBottom>Psyche</Typography>
    </div>
  )
}

export default withStyles(styles)(IndexPage)
