import { Robot } from '../../models/robot'
import { Token } from '../../models/token'

export async function robot(root, { _id }, { user }) {
  const userId = user.sub

  return Robot.findOne({ _id, userId })
}

export async function allRobots(root, { source }, { user }) {
  logger.info('Retrieving data all robtos.')
  const userId = source === 'robot' ? { $exists: false } : user.sub
  logger.info('User:', userId)
  const query = source ? { source, userId} : { userId }
  logger.debug('Query:', query)
  return Robot.find(query)
}

export async function token(root, { _id }) {
  return Token.findOne({ _id })
}
