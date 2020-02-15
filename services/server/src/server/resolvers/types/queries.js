import { logger } from '../../../logger'
import { Type } from '../../models/type'

export async function type(root, { _id }, { user }) {
  const userId = user.sub
  return Type.findOne({ _id, userId })
}

export async function allTypes(root, args, { user }) {
  logger.info('Getting all types...')
  const userId = user.sub
  logger.info('User: ', userId)
  const query = { $or: [{ userId }, { state: 'published' }, { state: 'deprecated' }]}
  logger.debug('Query:' , query)
  return Type.find(query)
}
