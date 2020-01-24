import React from 'react'

import WheeledRobot from './WheeledRobot'

export const metadata = {
  name: 'wheeled-robot',
  displayName: 'Wheeled Robot',
  version: '1.0.0',
  modes: [{
    name: '27',
    displayName: 'Strategic Utility Automaton',
    icon: '/assets/robotics/028-robotics-27.svg',
  }, {
    name: '81',
    displayName: 'Preliminary Pilot Cyborg',
    icon: '/assets/robotics/082-robotics-81.svg',
  }, {
    name: '77',
    displayName: 'Motorized Contamination Golem',
    icon: '/assets/robotics/078-robotics-77.svg',
  }, {
    name: '80',
    displayName: 'Reactive Excevation Automaton',
    icon: '/assets/robotics/081-robotics-80.svg',
  }, {
    name: '24',
    displayName: 'Anne Droid',
    icon: '/assets/robotics/025-robotics-24.svg',
  }]
}

export const Simulator = (props) => (
  <WheeledRobot {...props}></WheeledRobot>
)
