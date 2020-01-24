import { Type } from '../../models/type'

export default {
  async type(robot) {
    return Type.findOne({ _id: robot.typeId })
  }
}
