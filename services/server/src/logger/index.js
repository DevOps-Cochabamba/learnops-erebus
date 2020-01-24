import winston from 'winston'
import DailyRotateFile from 'winston-daily-rotate-file'

import { get } from '../settings'

export const logger = winston.createLogger({
  level: get('logger.level'),
  transports: [
    new DailyRotateFile(get('logger.dailyRotateFile')),
  ]
})

// if (process.env.NODE_ENV !== 'production') {
  logger.add(new winston.transports.Console({
    format: winston.format.simple(),
  }))
// }
