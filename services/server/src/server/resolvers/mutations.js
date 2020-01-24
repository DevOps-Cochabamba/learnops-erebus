import { assign } from 'lodash'

import * as robots from './robots/mutations'
import * as types from './types/mutations'

export const Mutation = assign({}, types, robots)
