import { connect } from 'rsup-mqtt'
import _ from 'lodash'

import { client as apollo } from '../../apollo'
import { rabbitmq } from '../../settings'
import { query } from './query'

export const initialState = {
  loading: true,
  message: 'Connecting',
  client: null,
  robot: null,
  error: null
}

export function sleep(ms) {
  return new Promise(resolve => setTimeout(() => resolve(), ms))
}

export async function initialize(id, setState) {
  try {
    setState({ message: 'Getting Robot Descriptor' })
    const variables = { id }
    const { data: { robot } } = await apollo.query({ query, variables })
    setState({ message: 'Ready Robot Descriptor' })
    await sleep(200)

    setState({ message: 'Starting Session' })
    const client = await connect(rabbitmq)
    setState({ message: 'Connected' })
    await sleep(200)

    if (!robot) {
      throw new Error('Robot does not exist')
    }

    document.title = `Erebus - ${robot.name}`
    setState({ loading: false, client, robot })
  } catch (innerError) {
    console.log(innerError)
    const message = innerError && innerError.message ?  `, ${innerError.message}` : ''
    const error = new Error(`Unable to open Erebus session${message}`)
    setState({ error })
  }
}

export function process({ match, location }) {
  const { id, name } = match.params
  const query = _.toArray(new URLSearchParams(location.search).entries())
  const props = { query: _.fromPairs(query) }

  return { id, name, props }
}
