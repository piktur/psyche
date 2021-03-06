// @flow

import * as React from 'react'
import { withRouter } from 'found'
import Typography from '@material-ui/core/Typography'
import { withStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
// import background from 'assets/images/background@1.jpg'
import type { routerShape } from 'found/lib/PropTypes'

const styles = theme => ({
  ...theme.page(),
  // ...theme.mixins.background(background)
})

type Props = {
  classes: Object,
  router: routerShape,
}

class IndexPage extends React.Component<Props> {
  handleClick = (e) => {
    e.preventDefault()
    this.props.router.push('/signup')
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

export default withRouter(withStyles(styles)(IndexPage))
