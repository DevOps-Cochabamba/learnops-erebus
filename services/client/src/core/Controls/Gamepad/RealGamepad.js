import { EventEmitter } from 'events'
import _ from 'lodash'

export default class RealGamepad extends EventEmitter {
  gamepads = []
  selected = null

  timer = null
  buttons = []

  poll() {
    const method = navigator.getGamepads ? 'getGamepads' : 'webkitGetGamepads'
    return navigator[method]()
  }

  select(gamepadId) {
    this.selected = gamepadId
  }

  events(connectHandler, disconnectHandler) {
    const base = 'GamepadEvent' in window ? '' : ('WebKitGamepadEvent' in window ? 'webkit' : '')
    window.addEventListener(`${base}gamepadconnected`, connectHandler)
    window.addEventListener(`${base}gamepaddisconnected`, disconnectHandler)
  }

  start() {
    this.timer = setInterval(() => {
      const gamepads = this.poll()

      for (let i = 0; i < gamepads.length; ++i) {
        const pad = gamepads[i]

        if (!_.isNil(pad)) {
          if (this.selected && pad.id !== this.selected) continue

        
          const old = this.buttons[pad.id] || []
          const buttons = _.map(pad.buttons, ({ pressed }) => pressed)
          const updates = buttons.map((item, index) => {
            const hasUpdate = _.isBoolean(old[index]) && item !== old[index]
            return hasUpdate ? { button: index, type: item ? 'keydown' : 'keyup' } : null
          }).filter(_.identity)
          this.buttons[pad.id] = buttons
          
          if (updates.length > 0) {
            this.emit('update', pad, updates)
          }
        }
      }
    }, 100)
  }
}
