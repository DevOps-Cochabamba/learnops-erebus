import { start } from './server'
import { logger } from './logger'
import { connect } from './database'

(async () => {
  try {
    await connect()
    await start()
  } catch (error) {
    console.log(error)
    logger.error(error, 'Unexpected error', error)
  }
})()