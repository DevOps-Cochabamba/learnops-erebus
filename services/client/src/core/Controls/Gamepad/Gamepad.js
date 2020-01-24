import React from 'react'
import ReactNipple from 'react-nipple'
import functional from 'react-functional'
import { translate } from 'react-i18next'
import $ from 'jquery'
import _ from 'lodash'

import InTable from './InTable'
import CircularButton from '../../../components/CircularButton/CircularButton'
import { options, style } from './nipple'
import {
  toggleButtons,
  toggleVideoStream,
  toggleExpandStream,
  updateGamepadButtons,
  showHelp
} from './helpers'
import RobotIcon from '../../../components/RobotIcon/RobotIcon'
import { keyboard } from './settings'
import RealGamepad from './RealGamepad'

// 'https://player.twitch.tv/?channel=garyascuy'
const Gamepad = ({ t, sdk, control, data, query: { mode } }) => {
  const action = (down, code) => {
    // if (down) $('#messages.messages')
    //     .prepend(`<div class='content'><b style='color:#21ba45'>ME:</b> <b style='color:#db2828'>CODE{</b>${code}<b style='color:#db2828'>}</b></div>`)
    //     .children(':first').delay(5000).slideUp()

    control.send(sdk.button(code, down))
  }
  const axis = (selector, modifier, angle) => control.send(sdk.axis(selector, modifier, angle))

  const { stream } = data
  const actions = data.type.actions || ""

  return (
    <div className={`erebus control gamepad control-${mode}`}>
      <div id='messages' className='messages' />
      <div className='control top'>
        <div className='show more'>
          <button id='helpAction' onClick={e => showHelp(e, actions, t)} className='erebus circular command ui circular teal huge icon button'>
            <i className='help icon'/>
          </button>
          <button id='expandStreamAction' onClick={e => toggleExpandStream(e)} className='erebus circular command ui circular teal huge icon button'>
            <i className='compress icon'/>
          </button>
          <button id='showStreamAction' onClick={e => toggleVideoStream(e, stream)} className='erebus circular command active ui circular teal huge icon button'>
            <i className='video icon'/>
          </button>
          <button id='showMore' onClick={e => toggleButtons(e)} className='erebus circular command ui circular blue huge icon button'>
            <i className='angle double down icon'/>
          </button>
        </div>
        { mode === 'keyboard' &&
          <div id='moreJoystickButtons'>
            <h3>Keyboard Manual</h3>
            <div className='ui one column grid'>
              <div className='column'><img alt='keyboard control config' style={{maxHeight: 235}} src='/assets/man/keyboard-controls.svg' /></div>
              <div className='column'><img alt='keyboard buttons config' style={{maxHeight: 200}} src='/assets/man/keyboard-button.svg' /></div>
            </div>
          </div>
        }
        { mode === 'gamepad' &&
          <div id='moreJoystickButtons'>
            <h3>Gamepad Settings</h3>
            <div id="gamepad-options" className='gamepad options'/>
            <div className='important'>
              <h5 id='selected'>.</h5>
            </div>
          </div>
        }
        { mode === 'web' &&
          <div id='moreJoystickButtons'>
            <CircularButton action={action} name='1' code={4} className='real green huge' />
            <CircularButton action={action} name='2' code={5} className='real green huge' />
            <CircularButton action={action} name='3' code={6} className='real orange huge' />
            <CircularButton action={action} name='4' code={7} className='real orange huge' />
            <CircularButton action={action} name='5' code={8} className='real teal huge' />
            <CircularButton action={action} name='6' code={9} className='real teal huge' />
            <CircularButton action={action} name='7' code={10} className='real pink huge' />
            <CircularButton action={action} name='8' code={11} className='real pink huge' />
            <div className='important'>
              <CircularButton action={action} name='L' code={12} className='real red huge' />
              <CircularButton action={action} name='R' code={13} className='real blue huge' />
            </div>
          </div>
        }
      </div>

      <div id='content' className='content active'>
        <div className='picture'>
          <RobotIcon code={27} />
        </div>
        <iframe title='steam' src={stream}></iframe>
      </div>
      { mode === 'web' &&
        <div className='control down'>
          <InTable className='main axis'>
            <ReactNipple id="main-button-axis"
              options={options}
              style={style}
              onMove={(evt, { position, angle }) => {
                const normalizedAngle = angle.degree - 180
                // console.log('x=', x, 'y=', y, 'a=', angle.degree)
                axis(0, 0, normalizedAngle === 0 ? 0 : normalizedAngle / 360)
              }} />
          </InTable>
          <InTable id="main-button-group" className='main buttons'>
            <div id="main-button-group-one" className='group'>
              <CircularButton id="main-button-group-one-x" action={action} name='X' code={0} className='real blue huge' />
              <CircularButton id="main-button-group-one-y" action={action} name='Y' code={1} className='real orange huge' />
            </div>
            <div id="main-button-group-two" className='group'>
              <CircularButton id="main-button-group-one-a" action={action} name='A' code={2} className='real green huge' />
              <CircularButton id="main-button-group-one-b" action={action} name='B' code={3} className='real red huge' />
            </div>
          </InTable>
        </div>
      }
    </div>
  )
}

Gamepad.componentDidMount = ({ sdk, control, data, query: { mode }}) => {
  console.log(data)
  control.on('message', (message) => {
    console.log('MESSAGE', message)
    const json = message.selector === 666 ? `<b>T: </b>${message.values}` : JSON.stringify(message)
    $('#messages.messages')
      .prepend(`<div>${json}</div>`)
      .children(':first').delay(3000).slideUp()
  })
  control.on('error', (message) => {
    console.log('ERROR', message)
    $('#messages.messages')
      .prepend(`<div class='ui error message'>Error :(</div>`)
      .children(':first').delay(3000).slideUp()
  })
  control.start()

  // Gamepad as Keyboard mode
  if (mode === 'keyboard') {
    const action = (down, code) => control.send(sdk.button(code, down))

    document.addEventListener('keydown', (event) => {
      event.key && !_.isNil(keyboard[event.key]) && action(true, keyboard[event.key])
    })

    document.addEventListener('keyup', (event) => {
      event.key && !_.isNil(keyboard[event.key]) && action(false, keyboard[event.key])
    })
  }

  // http://html5gamepad.com/
  if (mode === 'gamepad') {
    const gamepad = new RealGamepad()
    const action = (down, code) => {
      $('#messages.messages')
        .prepend(`<div class='content'><b style='color:#21ba45'>ME:</b> <b style='color:#db2828'>CODE{</b>${code}<b style='color:#db2828'>}</b></div>`)
        .children(':first').delay(5000).slideUp()

      control.send(sdk.button(code, down))
    }

    const connectHandler = (event) => {
      const gamepads = gamepad.poll()
      updateGamepadButtons(gamepads, $('#gamepad-options'), (id) => gamepad.select(id))

      $('#messages.messages')
        .prepend(`<div class='content'><b style='color:#21ba45'>ME:</b> <b style='color:#21ba45'>Connected{</b>${event.gamepad.id}<b style='color:#21ba45'>}</b></div>`)
        .children(':first').delay(5000).slideUp()
    }
    const disconnectHandler = (event) => {
      const gamepads = gamepad.poll()
      updateGamepadButtons(gamepads, $('#gamepad-options'), (id) => gamepad.select(id))

      $('#messages.messages')
        .prepend(`<div class='content'><b style='color:#21ba45'>ME:</b> <b style='color:#db2828'>Disconected{</b>${event.gamepad.id}<b style='color:#db2828'>}</b></div>`)
        .children(':first').delay(5000).slideUp()
    }
    gamepad.events(connectHandler, disconnectHandler)
    gamepad.on('update', (gamepad, updates) => {
      updates.forEach(({ button, type }) => action(type === 'keydown', button))
    })
    gamepad.start()
  }
}

export default translate('bundle')(
  functional(Gamepad)
)
// export default functional(Gamepad)
