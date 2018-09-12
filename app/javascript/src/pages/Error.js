// @flow

import * as React from 'react'
import Typography from '@material-ui/core/Typography'

type Props = {
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

export default (props: Props): React.Element<'main'> => {
  const { error } = props

  return <main>
    <Typography variant="display4" gutterBottom>
      {error && error.status ? `Error [${error.status}]` : 'Error'}
    </Typography>
    {error && <Message {...props} />}
  </main>
}
