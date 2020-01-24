import $ from 'jquery'
import { settings } from './settings'

const { limits, inc, interval } = settings

export default class Robot {
  $body = null
  $bot = null
  timer = null
  degreeOfFreedom = null

  $legA = null
  $legB = null
  $legC = null
  $hand = null

  incValue = 0
  incs = {
    a: false,
    b: false,
    c: false,
    hand: false
  }

  state = {
    a: 0,
    b: 0,
    c: 0,
    hand: 0,
    handOpen: true
  }

  constructor($bot, degreeOfFreedom) {
    this.$bot = $bot
    this.degreeOfFreedom = degreeOfFreedom
    this.initialize($bot)
  }

  getClassName(degreeOfFreedom) {
    return {
      '2': 'two',
      '3': 'three'
    }[degreeOfFreedom] || ''
  }

  initialize($bot) {
    this.$body = $('body')
    $bot.addClass(this.getClassName(this.degreeOfFreedom))
    this.$legA = $bot.find('.leg_a')
    this.$legB = $bot.find('.leg_b')
    this.$legC = $bot.find('.leg_c')
    this.$hand = $bot.find('.hand')
    $bot.show()
  }

  updateState() {
    if (this.incValue === 0) return

    if (this.incs.a) this.state.a += this.incValue
    if (this.incs.b && this.degreeOfFreedom > 2) this.state.b += this.incValue
    if (this.incs.c && this.degreeOfFreedom > 3) this.state.c += this.incValue
    if (this.incs.hand) this.state.hand += this.incValue

    this.state.a = this.setAngle(this.$legA, this.state.a, limits.a)
    this.state.b = this.setAngle(this.$legB, this.state.b, limits.b)
    this.state.c = this.setAngle(this.$legC, this.state.c, limits.c)
    this.state.hand = this.setAngle(this.$hand, this.state.hand, limits.hand)
  }

  setAngle($leg, angle, limit) {
    let value = angle
    if (angle < limit.min) value = limit.min
    if (angle > limit.max) value = limit.max

    $leg.css({ transform: `rotate(${value}deg)` })
    return value
  }

  update(key, enabled) {
    this.incs[key] = !this.incs[key]
  }

  increment(enabled) {
    this.incValue = enabled ? inc : 0
  }

  decrement(enabled) {
    this.incValue = enabled ? -inc : 0
  }

  openHand() {
    console.log('openHand')
    this.$hand.addClass('close')
  }

  closeHand() {
    console.log('openHand')
    this.$hand.removeClass('close')
  }

  play(container) {
    container.robot = this

    this.timer = setInterval(() => {
      this.updateState()
    }, interval)
  }

  stop() {
    clearInterval(this.timer)
  }
}
