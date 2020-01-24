import React from 'react'
import _ from 'lodash'

const global = window
_.set(global, 'erebus.controls.instances', {})
_.set(global, 'erebus.controls.fn', {})

export function getAll() {
  return _.values(global.erebus.controls.instances)
}

export function get(name) {
  return global.erebus.controls.instances[name] || {
    metadata: null,
    component: () => <div>Error: Control does not exist</div>,
  }
}

export function getMetadata(name) {
  return get(name).metadata
}

export function getComponent(name) {
  return get(name).component
}

export function register({ metadata, component, Control }) {
  const { name } = metadata
  component = component || Control
  return global.erebus.controls.instances[name] = { metadata, component }
}

global.erebus.controls.fn = { getAll, get, getMetadata, getComponent }
