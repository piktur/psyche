// @flow

import * as React from 'react'
import Grid from '@material-ui/core/Grid'
import TextField from '@material-ui/core/TextField'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Checkbox from '@material-ui/core/Checkbox'

type Props = {
  classes?: Object,
}

type State = {
  address1: string,
  address2: ?string,
  city: string,
  state: string,
  country: string,
  postCode: string,
  isShipping: boolean,
  isBilling: boolean,
}

class Address extends React.Component<Props, State> {
  state = {
    address1: '',
    address2: '',
    city: '',
    state: '',
    country: '',
    postCode: '',
    isShipping: true,
    isBilling: true,
  }

  handleChange = ({ target: { name, value } }: { target: { name: string, value: string } }): void => {
    this.setState({ [name]: value })
  }

  handleClickCheckbox = ({ target: { name } }: { target: { name: string } }): void => {
    this.setState((prevState) => ({ [name]: !prevState[name] }))
  }

  render(): Grid {
    return <Grid container spacing={24}>
      <Grid item xs={12}>
        <TextField
          autoComplete="billing address-line1"
          fullWidth
          label="Address"
          name="address1"
          onChange={this.handleChange}
          required
          value={this.state.address1}
        />
      </Grid>

      <Grid item xs={12}>
        <TextField
          autoComplete="billing address-line2"
          fullWidth
          name="address2"
          onChange={this.handleChange}
          value={this.state.address2}
        />
      </Grid>

      <Grid item xs={12} sm={6}>
        <TextField
          autoComplete="billing address-city"
          fullWidth
          label="City"
          name="city"
          onChange={this.handleChange}
          value={this.state.city}
        />
      </Grid>

      <Grid item xs={12} sm={6}>
        <TextField
          fullWidth
          label="State"
          name="state"
          onChange={this.handleChange}
          required
          value={this.state.state}
        />
      </Grid>

      <Grid item xs={12} sm={6}>
        <TextField
          autoComplete="billing postal-code"
          fullWidth
          label="Post Code"
          name="postCode"
          onChange={this.handleChange}
          required
          value={this.state.postCode}
        />
      </Grid>

      <Grid item xs={12} sm={12}>
        <TextField
          autoComplete="billing country"
          fullWidth
          label="Country"
          name="country"
          onChange={this.handleChange}
          required
          value={this.state.country}
        />
      </Grid>

      <Grid item xs={12}>
        <FormControlLabel
          control={
            <Checkbox
              color="secondary"
              name="isBilling"
              value={this.state.isBilling}
              checked={this.state.isBilling}
            />
          }
          label="Use this address for payment details"
          onClick={this.handleClickCheckbox}
          value={this.state.isBilling}
        />
      </Grid>
    </Grid>
  }
}

export default Address
