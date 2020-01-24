import EventEmitter from 'events'

import { buildControlChannel, buildRobotChannel } from '../utils/channel'

export default class ControlClient extends EventEmitter {
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
   * Uses control channel to read messages from robot.
   */
  start() {
    this.mqtt.subscribe(this.controlChannel).on(data => {
      try {
        const message = this.decode(data.toString())
        this.emit('message', message)
      } catch (error) {
        this.emit('error', error)
      }
    })
  }

  /**
   * Uses robot channel to send messages to robot.
   */
  send(message) {
    this.mqtt.publish(this.robotChannel, this.encode(message))
  }
}
