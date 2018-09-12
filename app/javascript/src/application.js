// @flow

import React from 'react'
import ReactDOM from 'react-dom'
import Router from './Router'
import 'typeface-roboto'

document.addEventListener('DOMContentLoaded', () => {
  const app = document.getElementById('app')

  if (!app) {
    throw new Error('Root element `#app` missing')
  }

  ReactDOM.render(<Router />, app)
})
