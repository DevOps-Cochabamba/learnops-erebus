import React from 'react'
import _ from 'lodash'

const global = window
_.set(global, 'erebus.simulators.instances', {})
_.set(global, 'erebus.simulators.fn', {})

export function getAll() {
  return _.values(global.erebus.simulators.instances)
}

export function get(name) {
  return global.erebus.simulators.instances[name] || {
    metadata: null,
    component: () => <div>Error: Simulator does not exist</div>,
  }
}

export function getMetadata(name) {
  return get(name).metadata
}

export function getComponent(name) {
  return get(name).component
}

export function register({ metadata, component, Simulator }) {
  const { name } = metadata
  component = component || Simulator
  return global.erebus.simulators.instances[name] = { metadata, component }
}

global.erebus.simulators.fn = { getAll, get, getMetadata, getComponent }
