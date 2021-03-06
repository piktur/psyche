// @flow

import * as React from 'react'
import { createFragmentContainer, graphql } from 'react-relay'
import { withRouter } from 'found'
import { ROLES } from '../../constants'
import Address from './Address/Address'
import Button from '@material-ui/core/Button'
import FormControl from '@material-ui/core/FormControl'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import FormHelperText from '@material-ui/core/FormHelperText'
import FormLabel from '@material-ui/core/FormLabel'
import Input from '@material-ui/core/Input'
import InputLabel from '@material-ui/core/InputLabel'
import Paper from '@material-ui/core/Paper'
import Radio from '@material-ui/core/Radio'
import RadioGroup from '@material-ui/core/RadioGroup'
import TextField from '@material-ui/core/TextField'
import Typography from '@material-ui/core/Typography'
import { withStyles } from '@material-ui/core/styles'
import CreateProfileMutation from '../../mutations/CreateProfileMutation'
import type { routerShape } from 'found/lib/PropTypes'

const styles = theme => ({
  root: {
    display: 'block', // Fix IE11 issue.
    width: 'auto',
    margin: theme.spacing.unit * 1,
    [theme.breakpoints.up('md')]: {
      width: '60vw',
      margin: `${theme.spacing.unit * 8}px auto`,
    },
  },
  paper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: theme.spacing.unit * 2,
    [theme.breakpoints.up('md')]: {
      padding: theme.spacing.unit * 3,
    }
  },
  form: {
    width: '100%', // Fix IE11 issue.
  },
  radioGroup: {
    margin: `${theme.spacing.unit}px 0`,
  },
  submit: {
    marginTop: theme.spacing.unit * 3,
  },
})

type Props = {
  classes: Object,
  viewer: Object,
  router: routerShape,
  environment: Object,
}

type State = {
  firstName: string,
  lastName: string,
  birthday?: ?Date,
  gender?: ?string,
  errors: {
    firstName?: ?string,
    lastName?: ?string,
    birthday?: ?string,
    gender?: ?string,
  },
}

class Profile extends React.Component<Props, State> {
  state = {
    firstName: '',
    lastName: '',
    birthday: null,
    gender: null,
    errors: {}
  }

  handleChange = ({ target: { name, value } }: { target: { name: string, value: string } }) => {
    this.setState({ [name]: value })
  }

  handleSubmit = (e) => {
    e.preventDefault()

    const { firstName, lastName, birthday } = this.state

    CreateProfileMutation({ firstName, lastName, birthday }, (data, errors) => {
      if (errors) {
        const messages = {}
        errors.forEach(({ path, message }) => {
          const attribute = JSON.parse(path).slice(-1)
          messages[attribute] = message
        })
        this.setState({ errors: messages })
      } else {
        const { viewer: { role } } = this.props

        this.props.router.replace(`/${ROLES[role]}`)
      }
    })
  }

  render() {
    const { classes } = this.props
    const { errors } = this.state

    return (
      <div className={classes.root}>
        <Paper className={classes.paper}>
          <Typography variant="headline">Profile</Typography>
          <Typography variant="subheading">Testing 12</Typography>

          <form className={classes.form}>
            <FormControl margin="normal" required fullWidth>
              <InputLabel htmlFor="first-name">First Name</InputLabel>
              <Input
                autoComplete="given-name"
                autoFocus
                error={!!errors.firstName}
                name="firstName"
                onChange={this.handleChange}
                value={this.state.firstName}
              />
              {errors.firstName && <FormHelperText>{errors.firstName}</FormHelperText>}
            </FormControl>

            <FormControl margin="normal" required fullWidth>
              <InputLabel htmlFor="lastName">Last Name</InputLabel>
              <Input
                autoComplete="family-name"
                autoFocus
                error={!!errors.lastName}
                name="lastName"
                onChange={this.handleChange}
                value={this.state.lastName}
              />
              {errors.lastName && <FormHelperText>{errors.lastName}</FormHelperText>}
            </FormControl>

            <FormControl margin="normal" fullWidth>
              <TextField
                autoComplete="bday"
                className={classes.textField}
                InputLabelProps={{
                  shrink: true,
                }}
                label="Birthday"
                name="birthday"
                type="date"
              />
              {errors.birthday && <FormHelperText>{errors.birthday}</FormHelperText>}
            </FormControl>

            <FormControl margin="normal" fullWidth>
              <FormLabel component="legend">Gender</FormLabel>
              <RadioGroup
                aria-label="Gender"
                autoComplete="sex"
                className={classes.radioGroup}
                name="gender"
                onChange={this.handleChange}
                row
                value={this.state.gender}
              >
                <FormControlLabel value="male" control={<Radio />} checked label="Male" />
                <FormControlLabel value="female" control={<Radio />} label="Female" />
                <FormControlLabel value="other" control={<Radio />} label="Other" />
              </RadioGroup>
              {errors.gender && <FormHelperText>{errors.gender}</FormHelperText>}
            </FormControl>

            <Address />

            <Button
              className={classes.submit}
              color="primary"
              fullWidth
              onClick={this.handleSubmit}
              type="submit"
              variant="raised"
            >
              Submit
            </Button>
          </form>
        </Paper>
      </div>
    )
  }
}

export default createFragmentContainer(withRouter(withStyles(styles)(Profile)), graphql`
  fragment Profile_profile on Profile {
    firstName
    lastName
    birthday
  }

  fragment Profile_viewer on Viewer {
    role
    isAuthenticated
  }
`)
