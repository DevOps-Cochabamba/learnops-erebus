import { load } from '@gplatform/settings'

import defaults  from './settings.json'
import schema from './schema.js'

const appName = 'GG_BOTS_'

module.exports = load({
  defaults,
  schema,
  commandLineInterface: true,
  app: process.env[appName],
  variables: process.env,
  regex: new RegExp('^' + appName + '_')
})
