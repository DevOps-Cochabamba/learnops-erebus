import React from 'react'

import GenericConsole from './GenericConsole'

export const metadata = {
  name: 'generic-console',
  displayName: 'Generic Console',
  version: '1.0.0',
  modes: [{
    name: 'black',
    displayName: 'Generic Console Black',
    icon: '/assets/core/simulators/generic-console.black.svg',
  }, {
    name: 'white',
    displayName: 'Generic Console White',
    icon: '/assets/core/simulators/generic-console.white.svg',
  }]
}

export const Simulator = (props) => (
  <GenericConsole {...props}></GenericConsole>
)
