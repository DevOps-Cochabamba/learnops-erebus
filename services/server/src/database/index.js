import mongoose from 'mongoose'

import { get } from '../settings'
import { logger } from '../logger'

export async function connect() {
  const { url, options } = get('mongoose')
  try {
    const db = await mongoose.connect(url, options)
    mongoose.set('useFindAndModify', false)
    logger.info(`database connected to ${url}`)
    return db
  } catch (error) {
    logger.error(`database conection to ${url}`)    
    throw error
  }
}

export async function disconnect() {
  mongoose.connection.close(() =>  logger.info('Mongoose default connection is disconnected'))
}
