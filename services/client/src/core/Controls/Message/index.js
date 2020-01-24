import React from 'react'

import Message from './Message'

export const metadata = {
  name: 'message',
  displayName: 'Message',
  version: '1.0.0',
  mobileAlias: 'computer',
  modes: [{
    name: 'mobile',
    displayName: 'QR Message',
  }, {
    name: 'computer',
    displayName: 'CLI Message',
  }]
}

export const Control = (props) => (
  <Message {...props}></Message>
)
