import React, { Component } from 'react'
import _ from 'lodash'
import qs from 'query-string'

import { getComponent } from '../../../core/Controls'
import ErrorMessage from '../ErrorMessage'
import { initialize, process, initialState } from '../helpers'

import { ControlClient } from 'erebus-sdk'
import * as erebus from 'erebus-protocols'

class Control extends Component {
  state = _.assign({}, initialState)

  componentDidMount() {
    const { params } = this.props.match
    const query = qs.parse(this.props.location.search)
    
    if (query.token) {
      localStorage.setItem('x-erebus-token', query.token)
      delete query.token
      window.location.href = `${window.location.pathname}?${qs.stringify(query)}`
    } 

    initialize(params.id, state => this.setState(state))
  }

  render() {
    const { loading, message, client, robot, error } = this.state
    const { id, name, props } = process(this.props)
    const CustomControl = getComponent(name)

    return (
      <div className='control single page'>
        { error ? (
          <ErrorMessage error={error}></ErrorMessage>
        ) : (
          loading ? (
            <div className='ui active inverted dimmer'>
              <div className='ui text loader'>{message}</div>
            </div>
          ) : (
            <CustomControl id={id} client={client} sdk={erebus} data={robot} control={new ControlClient(client, robot.session, erebus.protocols.gbc)} {...props}></CustomControl>
          )
        )}
      </div>
    )
  }
}

export default Control
