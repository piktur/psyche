// @flow

import * as React from 'react'
import AuthenticateMutation from '../../mutations/AuthenticateMutation'
import SignUpMutation from '../../mutations/SignUpMutation'
import Avatar from '@material-ui/core/Avatar'
import Button from '@material-ui/core/Button'
import FingerprintIcon from '@material-ui/icons/Fingerprint'
import FormControl from '@material-ui/core/FormControl'
import FormHelperText from '@material-ui/core/FormHelperText'
import Input from '@material-ui/core/Input'
import InputLabel from '@material-ui/core/InputLabel'
import Grid from '@material-ui/core/Grid'
import MenuItem from '@material-ui/core/MenuItem'
import Paper from '@material-ui/core/Paper'
import Select from '@material-ui/core/Select'
import Typography from '@material-ui/core/Typography'
import { withStyles } from '@material-ui/core/styles'
import { AUTH_TOKEN, AUTH_ENTITY } from '../../constants'

const styles = theme => ({
  layout: {
    width: 'auto',
    display: 'block', // Fix IE11 issue.
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    [theme.breakpoints.up('md')]: {
      width: 400,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  paper: {
    marginTop: theme.spacing.unit * 8,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme.spacing.unit * 3}px`,
  },
  form: {
    width: '100%', // Fix IE11 issue.
    marginTop: theme.spacing.unit,
  },
  avatar: {
    margin: theme.spacing.unit,
    backgroundColor: theme.palette.primary.dark,
  },
  select: {
    marginTop: theme.spacing.unit * 2,
    marginBottom: theme.spacing.unit * 4,
  },
  radioGroup: {
    margin: `${theme.spacing.unit}px 0`,
  },
  submit: {
    marginTop: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit,
  },
})

type Props = {
  classes: {
    layout: number,
    paper: string,
    avatar: string,
    form: string,
    submit: string,
    radioGroup?: string,
  },
  history: Object,
}

type State = {
  email: string,
  password: string,
  role?: ?string,
  isVisitor: boolean,
  errors?: {
    email?: ?string,
    password?: ?string,
    role?: ?string,
  },
}

class SignIn extends React.Component<Props, State> {
  state = {
    email: '',
    password: '',
    role: '',
    isVisitor: false,
    errors: {
      email: undefined,
      password: undefined,
    }
  }

  _authenticate = async () => {
    const { email, password } = this.state

    AuthenticateMutation(email, password, ({ user, token, errors }) => {
      if (errors) {
        this.handleValidationErrors(errors)
      } else {
        this._setToken(user.id, token)
        this.props.history.push('/')
      }
    })
  }

  _signUp = async () => {
    const { email, password } = this.state

    SignUpMutation(email, password, ({ user, token, errors }) => {
      if (errors) {
        this.handleValidationErrors(errors)
      } else {
        this._setToken(user.id, token)
        this.props.history.push('/profile')
      }
    })
  }

  _setToken = (id: number, token: string) => {
    localStorage.setItem(AUTH_ENTITY, id.toString())
    localStorage.setItem(AUTH_TOKEN, token)
  }

  handleValidationErrors = (errors) => {
    const messages = {}
    errors.forEach(({ path, message }) => {
      const attribute = JSON.parse(path).slice(-1)
      messages[attribute] = message
    })
    this.setState({ errors: messages })
  }

  handleChange = ({ target: { name, value } }) => {
    this.setState({ [name]: value })
  }

  handleClickSignUp = async (event) => {
    event.preventDefault()
    this.setState({ isVisitor: true })
    await this._authenticate()
  }

  handleClickLogin = async (event) => {
    event.preventDefault()
    await this._signUp()
  }

  render() {
    const { classes } = this.props
    const { errors, isVisitor } = this.state

    return (
      <div className={classes.layout}>
        <Paper className={classes.paper}>
          <Avatar className={classes.avatar}>
            <FingerprintIcon />
          </Avatar>
          <Typography variant="headline">Welcome</Typography>

          <form className={classes.form}>
            <FormControl margin="normal" required fullWidth>
              <InputLabel htmlFor="email">Email</InputLabel>
              <Input
                id="email"
                name="email"
                type="email"
                error={!!errors.email}
                autoComplete="email"
                autoFocus
                onChange={this.handleChange}
                value={this.state.email}
              />
              {errors.email && <FormHelperText>{errors.email}</FormHelperText>}
            </FormControl>

            <FormControl margin="normal" required fullWidth>
              <InputLabel htmlFor="password">Password</InputLabel>
              <Input
                id="password"
                name="password"
                type="password"
                error={!!errors.password}
                autoComplete="current-password"
                onChange={this.handleChange}
                value={this.state.password}
              />
              {errors.password && <FormHelperText>{errors.password}</FormHelperText>}
            </FormControl>

            <FormControl className={classes.select} fullWidth>
              <InputLabel shrink htmlFor="role-label-placeholder">
                Role
              </InputLabel>

              <Select
                value={this.state.role}
                onChange={this.handleChange}
                input={<Input name="role" id="role-label-placeholder" />}
                name="role"
              >
                <MenuItem value="customer">Customer</MenuItem>
                <MenuItem value="clinic">Clinic</MenuItem>
                <MenuItem value="clinician">Clinician</MenuItem>
              </Select>
              <FormHelperText>Become a Member</FormHelperText>
            </FormControl>

            <Button
              name="login"
              type="submit"
              variant="raised"
              color="primary"
              className={classes.submit}
              onClick={this.handleSubmit}
            >
              Login
            </Button>

            <Button
              name="sign-up"
              type="submit"
              variant="raised"
              color="primary"
              className={classes.submit}
              onClick={this.handleSubmit}
            >
              Join
            </Button>
          </form>
        </Paper>
      </div>
    )
  }
}

export default withStyles(styles)(SignIn)
