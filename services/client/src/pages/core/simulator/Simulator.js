import React, { Component } from 'react'
import _ from 'lodash'

import { getComponent } from '../../../core/Simulators'
import ErrorMessage from '../ErrorMessage'
import { initialize, process, initialState } from '../helpers'

import { RobotClient } from 'erebus-sdk'
import * as erebus from 'erebus-protocols'

class Simulator extends Component {
  state = _.assign({}, initialState)

  componentDidMount() {
    const { params } = this.props.match
    initialize(params.id, state => this.setState(state))
  }

  render() {
    const { loading, message, client, robot, error } = this.state
    const { id, name, props } = process(this.props)
    const CustomSimulator = getComponent(name)

    return (
      <div className='simulator single page'>
        { error ? (
          <ErrorMessage error={error}></ErrorMessage>
        ) : (
          loading ? (
            <div className='ui active inverted dimmer'>
              <div className='ui text loader'>{message}</div>
            </div>
          ) : (
            <CustomSimulator id={id} client={client} sdk={erebus} data={robot} robot={new RobotClient(client, robot.session, erebus.protocols.gbc)}  {...props}></CustomSimulator>
          )
        )}
      </div>
    )
  }
}

export default Simulator
