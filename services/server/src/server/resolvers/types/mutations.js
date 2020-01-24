import { Type } from '../../models/type'
import _ from 'lodash'

export async function createType(root, { fields }, { user }) {
  fields.userId = user.sub
  const type = new Type(fields)
  return await type.save()
}

export async function updateType(root, { _id, fields }, { user }) {
  const userId = user.sub

  await Type.findOneAndUpdate({ _id, userId }, { $set: fields, $inc: { _v: 1 } })
  return Type.findOne({ _id })
}

export async function deleteType(root, { _id }, { user }) {
  const userId = user.sub

  const type = await Type.findOne({ _id, userId })
  if (!type) throw 'Record does not exist anymore'

  await Type.deleteOne({ _id })
  return type.toObject()
}
