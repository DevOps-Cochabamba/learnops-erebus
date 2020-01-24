import React from 'react'

import Gamepad from './Gamepad'

export const metadata = {
  name: 'gamepad',
  displayName: 'Gamepad',
  version: '1.0.0',
  mobileAlias: 'web',
  modes: [{
    name: 'mobile',
    displayName: 'QR Gamepad',
  }, {
    name: 'real',
    displayName: 'Gamepad',
  }, {
    name: 'web',
    displayName: 'Web Gamepad',
  }, {
    name: 'keyboard',
    displayName: 'Keyboard',
  }]
}

export const Control = (props) => (
  <Gamepad {...props}></Gamepad>
)
