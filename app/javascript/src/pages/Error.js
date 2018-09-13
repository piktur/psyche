// @flow

import * as React from 'react'
import Typography from '@material-ui/core/Typography'
import { withStyles } from '@material-ui/core/styles'

const styles = theme => ({
  // ...theme.page(),
})

type Props = {
  classes: Object,
  error: {
    status?: number | string,
    message?: string
  }
}

const Message = (props: Props) => {
  const { message } = props.error

  return <Typography variant="subheading" gutterBottom>
    {message}
  </Typography>
}

export default withStyles(styles)((props: Props): React.Element<'div'> => {
  const { error, classes } = props

  return <div className={classes.root}>
    <main className={classes.content}>
      <Typography variant="display4" gutterBottom>
        {error && error.status ? `Error [${error.status}]` : 'Error'}
      </Typography>
      {error && <Message {...props} />}
    </main>
  </div>
})
