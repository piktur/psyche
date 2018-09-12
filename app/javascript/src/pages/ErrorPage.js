// @flow

import * as React from 'react'
import Typography from '@material-ui/core/Typography'

type Props = {
  error?: string
}

export default (props: Props): React.Element<'main'> => (
  <main>
    <Typography variant="display4" gutterBottom>
      Error!
    </Typography>

    {typeof props.error === 'string' && (
      <Typography variant="subheading" gutterBottom>
        {props.error}
      </Typography>
    )}
  </main>
)
