// @flow

import React from 'react'
import CircularProgress from '@material-ui/core/CircularProgress'
import { withStyles } from '@material-ui/core/styles'

const styles = theme => ({
  progress: {
    margin: theme.spacing.unit * 2,
  },
})

type Props = {
  classes: Object,
}

function Loader(props: Props) {
  const { classes } = props

  return <CircularProgress className={classes.progress} />
}

export default withStyles(styles)(Loader)
