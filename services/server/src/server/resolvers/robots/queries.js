import { Robot } from '../../models/robot'
import { Token } from '../../models/token'

export async function robot(root, { _id }, { user }) {
  const userId = user.sub

  return Robot.findOne({ _id, userId })
}

export async function allRobots(root, { source }, { user }) {
  const userId = source === 'robot' ? { $exists: false } : user.sub

  const query = source ? { source, userId} : { userId }
  return Robot.find(query)
}

export async function token(root, { _id }) {
  return Token.findOne({ _id })
}
