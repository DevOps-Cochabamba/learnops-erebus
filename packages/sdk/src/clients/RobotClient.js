import EventEmitter from 'events'

import { buildControlChannel, buildRobotChannel } from '../utils/channel'

export default class RobotClient extends EventEmitter {
  constructor(mqtt, sessionId, protocol) {
    super()

    this.mqtt = mqtt
    this.protocol = protocol

    this.encode = protocol.encode
    this.decode = protocol.decode

    this.robotChannel = buildRobotChannel(sessionId)
    this.controlChannel = buildControlChannel(sessionId)
  }

  /**
   * Uses robot channel to read messages from control.
   */
  start() {
    this.mqtt.subscribe(this.robotChannel).on(data => {
      try {
        const message = this.decode(data.toString())
        this.emit('message', message)
      } catch (error) {
        this.emit('error', error)
      }
    })
  }

  /**
   * Uses control channel to send messages to control.
   */
  send(message) {
    this.mqtt.publish(this.controlChannel, this.encode(message))
  }
}
