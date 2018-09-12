// @flow

import * as React from 'react'
import Typography from '@material-ui/core/Typography'
import { withStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import background from 'assets/images/background@1.jpg'

const styles = theme => ({
  root: {
    display: 'flex',
    padding: theme.spacing.unit * 3,
  },
  content: {
    flexGrow: 1,
    overflow: 'auto',
  },
})

type Props = {
  classes: Object,
  history: Object,
}

class IndexPage extends React.Component<Props> {
  handleClick = (e) => {
    e.preventDefault()
    this.props.history.push('/sign-up')
  }

  render() {
    const { classes } = this.props

    return (
      <div className={classes.root}>
        <main className={classes.content}>
          <Typography variant="display4" gutterBottom>Psyche</Typography>

          <Button
            name="action"
            fullWidth={false}
            disableRipple
            variant="outlined"
            size="large"
            color="primary"
            className={classes.submit}
            onClick={this.handleClick}
          >
            Join
          </Button>
        </main>
      </div>
    )
  }
}

export default withStyles(styles)(IndexPage)
