import Random from 'meteor-random'
import crypto from 'crypto'
import _ from 'lodash'

import { Robot } from '../../models/robot'
import { Token } from '../../models/token'

function sha512(password, salt) {
  const hash = crypto.createHmac('sha512', salt)
  hash.update(password)
  const passwordHash = hash.digest('hex')
  return { salt, passwordHash }
}

export async function createRobot(root, { fields }, { user }) {
  const { registered, password } = fields
  delete fields.salt
  delete fields.passwordHash

  if (registered) {
    const robot = await Robot.findById(registered)
    const { passwordHash } = sha512(password, robot.salt)
    if (passwordHash !== robot.passwordHash) {
      throw new Error('Invalid password, please try again')
    }

    _.forEach(fields, (value, key) => _.isEmpty(value) && delete fields[key])
    return updateRobot(root, { _id: registered, fields }, { user })
  } else {
    if (!_.isEmpty(password)) {
      const passwordData = sha512(password, Random.id(6))
      _.assign(fields, passwordData)
      delete fields.password
    } else {
      fields.userId = user.sub
    }

    const robot = new Robot(fields)
    return robot.save()
  } 
}

export async function updateRobot(root, { _id, fields }, { user }) {
  delete fields.salt
  delete fields.passwordHash

  fields.userId = user.sub
  await Robot.findOneAndUpdate({_id}, fields)
  return Robot.findOne({_id})
}

export async function deleteRobot(root, { _id }, { user }) {
  const userId = user.sub

  const robot = await Robot.findOne({_id, userId})
  if (!robot) throw 'Record does not exist anymore'
  await Robot.remove({_id})
  return robot.toObject()
}

export async function createControlToken(root, { token, ref }, { user }) {
  const instance = new Token({ value: token, ref })
  await instance.save()

  const { _id } = instance.toObject()
  return _id
}
