import { assign } from 'lodash'

import * as types from './types/queries'
import * as robots from './robots/queries'

import { version } from '../../../package.json'

const info = {
  _info: () => ({
    name: 'Erebus - Remote Robotic Control System',
    version: version,
  }),
  _date: () => new Date().toISOString(),
  me: (root, args, { user }) => user,
}

export const Query = assign({}, info, types, robots) 
