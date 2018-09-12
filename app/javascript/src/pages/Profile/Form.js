// @flow

import * as React from 'react'
// import { graphql, createFragmentContainer, QueryRenderer } from 'react-relay'
import AddressForm from './Address/Form'

type Props = {

}

class Form extends React.Component<Props> {
  render() {
    return (
      <div>
        <AddressForm />
      </div>
    )
  }
}
