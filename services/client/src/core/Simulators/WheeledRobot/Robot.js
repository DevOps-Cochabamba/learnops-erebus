import $ from 'jquery'
import { settings } from './settings'

const { size, inc, interval } = settings

export default class Robot {
  $bot = null
  timer = null

  top = 0
  left = 0
  angle = 0

  state = {
    go: 0,
    direction: 0,
  }

  constructor($bot) {
    this.$bot = $bot
    this.$temperature = $bot.find('.temperature')
    this.initialize()
  }

  initialize() {
    const $body = $('body')
    const top = $body.height() / 2.0 - size.height / 2.0
    const left = $body.width() / 2.0 - size.width / 2.0
    this.setPosition(top, left)
    this.$bot.show()
  }

  setPosition(top, left) {
    this.top = top
    this.left = left
    this.$bot.css({ top, left })
  }

  setAngle(angle) {
    this.angle = angle
    this.$bot.css({ transform: `rotate(${angle}deg)` })
  }

  toggle() {
    this.$bot.toggleClass('active')
  }

  play(container) {
    container.robot = this

    this.timer = setInterval(() => {
      const { go, direction } = this.state  
      if (go === 0 && direction === 0) return;
  
      const angle = (this.angle + direction) % 360
      const top = this.top - Math.cos(this.angle / 360.0 * 2 * Math.PI) * go
      const left = this.left + Math.sin(this.angle / 360.0 * 2 * Math.PI) * go
  
      this.setPosition(top, left)
      this.setAngle(angle)
    }, interval)
  }

  stop() {
    this.state = { go: 0, direction: 0 }
  }
  goForward() {
    this.state.go = inc.go
  }
  goBack() {
    this.state.go = -inc.go
  }
  turnRight() {
    this.state.direction = inc.direction
  }
  turnLeft() {
    this.state.direction = -inc.direction
  }
  
  toggleLeftLight() {
    this.$bot.toggleClass('left')
  }
  toggleRightLight() {
    this.$bot.toggleClass('right')
  }

  getTemperaturePosition() {
    return this.$temperature.offset()
  }
}
