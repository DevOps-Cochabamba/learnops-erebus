import { Type } from '../../models/type'

export async function type(root, { _id }, { user }) {
  const userId = user.sub
  return Type.findOne({ _id, userId })
}

export async function allTypes(root, args, { user }) {
  const userId = user.sub
  const query = { $or: [{ userId }, { state: 'published' }, { state: 'deprecated' }]}
  return Type.find(query)
}
