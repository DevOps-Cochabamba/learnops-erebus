import React from 'react'

import ArmRobot from './ArmRobot'

export const metadata = {
  name: 'arm-robot',
  displayName: 'Arm Robot',
  version: '1.0.0',
  modes: [{
    name: '2',
    displayName: '2 Grados De Libertad',
    icon: '/assets/robotics/066-robotics-65.svg',
  }, {
    name: '3',
    displayName: '3 Grados De Libertad',
    icon: '/assets/robotics/065-robotics-64.svg',
  }, {
    name: '4',
    displayName: '4 Grados De Libertad',
    icon: '/assets/robotics/061-robotics-60.svg',
  }]
}

export const Simulator = (props) => (
  <ArmRobot {...props}></ArmRobot>
)
