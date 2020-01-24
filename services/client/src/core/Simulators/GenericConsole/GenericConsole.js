import React from 'react'
import functional from 'react-functional'
import $ from 'jquery'

import CircularButton from '../../../components/CircularButton/CircularButton'
import { toggleButtons } from './helpers'

const timeout = 5000

const GenericConsole = ({ sdk, robot, query: { mode }}) => {
  const action = (down, code) => robot.send(sdk.button(code, down))

  return (
    <div className={'erebus simulator generic-console ' + (mode || '')}>
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
            <CircularButton action={action} name='L' code={9} className='real red huge' />
            <CircularButton action={action} name='R' code={10} className='real blue huge' />
          </div>
        </div>
      </div>
      <div id='messages' className='messages' />
    </div>
  )
}

GenericConsole.componentDidMount = ({ robot }) => {
  robot.on('message', (message) => {
    const json = JSON.stringify(message)
    $('#messages.messages')
      .prepend(`<div class='content' title='${json}'><b style='color:#21ba45'>CONTROL:</b> ${json}</div>`)
      .children(':first').delay(timeout).slideUp()
  })
  robot.on('error', (message) => console.log('ERROR', message))
  robot.start()
}

export default functional(GenericConsole)
