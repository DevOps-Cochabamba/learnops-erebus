import joi from 'joi'

export default {
  service: {
    host: joi.string().required(),
    port: joi.number().integer().min(0).max(65535)
  },
  mongoose: {
    url: joi.string().required(),
    options: joi.object().required(),
  },
  jwt: {
    audience: joi.string().required(),
    jwksHost: joi.string().optional(),
    jwksUri: joi.string().optional(),
    issuer: joi.string().required(),
    jwksRequestsPerMinute: joi.number().required(),
  },
  logger: {
    level: joi.string().required(),
    dailyRotateFile: joi.object().required(),
  }
}
