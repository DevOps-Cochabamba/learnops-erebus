import React from 'react'
import functional from 'react-functional'
import $ from 'jquery'

import Robot from './Robot'

let robot

const ArmRobot = ({ sdk, robot: robotClient, data, query: { mode }}) => {
  // const action = (down, code) => robotClient.send(sdk.button(code, down))
  return (
    <div className='erebus simulator arm-robot'>
      <div id='robot-virtual' className='arm all'>
        <div className="base">
          <div className='leg_a'>
            <div className='leg_b'>
              <div className='leg_c'>
                <div className='hand'>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

ArmRobot.componentDidMount = ({ sdk, robot: robotClient, data: { type } }) => {
  const simulator = type.simulator || ''
  const [, degreeOfFreedom] = simulator.split('.')

  robot = new Robot($('#robot-virtual'), degreeOfFreedom)
  robot.play(window)

  robotClient.on('message', ({ cmd, selector, modifier, values }) => {
    if (cmd === 'axis') {
      const [value] = values
      const angle = value * 360 + 180
      console.log(angle)

      if (angle > 45 && angle < 135)
        robot.increment(true)
      else if (angle > 225 && angle < 315)
        robot.decrement(true)
      else {
        robot.increment(false)
        robot.decrement(false)
      }
    }

    if (cmd !== 'button') return

    const defaultAction = () => console.log('Not mapped button')
    const action = {
      // selectors
      '0': () => { if (modifier !== 0) robot.update('a') },
      '1': () => { if (modifier !== 0) robot.update('b') },
      '2': () => { if (modifier !== 0) robot.update('c') },
      '3': () => { if (modifier !== 0) robot.update('hand') },

      // inc / dec
      '4': () => robot.increment(modifier !== 0),
      '5': () => robot.decrement(modifier !== 0),

      // hand
      '6': () => robot.openHand(),
      '7': () => robot.closeHand(),
    }[selector] || defaultAction
    action()
  })

  robotClient.on('error', (message) => console.log('ERROR', message))
  robotClient.start()
}

export default functional(ArmRobot)
