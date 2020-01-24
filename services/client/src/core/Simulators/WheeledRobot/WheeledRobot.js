import React from 'react'
import functional from 'react-functional'
import $ from 'jquery'

import CircularButton from '../../../components/CircularButton/CircularButton'
import RobotIcon from '../../../components/RobotIcon/RobotIcon'
import { toggleButtons } from './helpers'
import Robot from './Robot'
import { startHeatmap } from './heatmap'

let robot

const WheeledRobot = ({ sdk, robot: robotClient, data, query: { mode }}) => {
  const action = (down, code) => robotClient.send(sdk.button(code, down))
  const { icon } = data

  return (
    <div className='erebus simulator wheeled-robot'>
      <div className='control top'>
        <div className='show more'>
          <button onClick={e => toggleButtons(e)} className='erebus circular command ui circular blue huge icon button'>
            <i className='angle double down icon'/>
          </button>
        </div>
        <div id='moreSimulatorButtons'>
          <CircularButton action={action} name='1' code={1} className='real green huge' />
          <CircularButton action={action} name='2' code={2} className='real green huge' />
          <CircularButton action={action} name='3' code={3} className='real orange huge' />
          <CircularButton action={action} name='4' code={4} className='real orange huge' />
          <CircularButton action={action} name='5' code={5} className='real teal huge' />
          <CircularButton action={action} name='6' code={6} className='real teal huge' />
          <CircularButton action={action} name='7' code={7} className='real pink huge' />
          <CircularButton action={action} name='8' code={8} className='real pink huge' />
          <div className='important'>
            <CircularButton onClick={() => robot.initialize()} name='Start' className='real red huge' />
            <CircularButton onClick={() => robot.toggle()} name='Select' className='real blue huge' />
          </div>
        </div>
      </div>

      <div id="heatmapContainerWrapper">
        <div id='heatmapContainer'></div>
      </div>

      <div id='robot-virtual' className='picture'>
        <span className='temperature'>.</span>
        <RobotIcon code={mode || icon || 27} />
      </div>
    </div>
  )
}

WheeledRobot.componentDidMount = ({ sdk, robot: robotClient }) => {
  robot = new Robot($('#robot-virtual'))
  robot.play(window)

  const heatmap = startHeatmap()

  robotClient.on('message', ({ cmd, selector, modifier }) => {
    if (cmd !== 'button') return

    if (modifier === 0) {
      robot.stop()
      return
    }

    const defaultAction = () => console.log('Not mapped button')
    const temperature = () => {
      const position = robot.getTemperaturePosition()
      const point = { x: position.left, y: position.top }
      const value = heatmap.getValueAt(point)
      console.log(value, point)
      robotClient.send(sdk.message(`${value} ℃ T ${0}`, 666))
    }

    const action = {
      '0': () => robot.goForward(),
      '2': () => robot.goBack(),
      '3': () => robot.turnLeft(),
      '1': () => robot.turnRight(),

      // lights
      '4': () => robot.toggleLeftLight(),
      '5': () => robot.toggleRightLight(),

      // temperature
      '6': temperature,
      '7': temperature,

      // extra lights (needs to be removed)
      '12':  () => robot.toggleLeftLight(),
      '13':  () => robot.toggleRightLight(),
    }[selector] || defaultAction
    action()
  })

  robotClient.on('error', (message) => console.log('ERROR', message))
  robotClient.start()
}

export default functional(WheeledRobot)
