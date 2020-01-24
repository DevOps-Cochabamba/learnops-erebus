import gql from 'graphql-tag'

export const ALL_ROBOTS = gql`query allRobots {
  allRobots(source: "web") {
    _id
    name
    description
    icon
    mode
    typeId
    type {
      name
      simulator
    }
    userId
    stream
    createdAt
    updatedAt
    _v
  }
}
`

export const ALL_UNASIGNED_ROBOTS = gql`query allUnasignedRobots {
  allRobots(source: "robot") {
    _id
    name
    icon
  }
}
`

export const ALL_ROBOT_TYPES = gql` query allAvailablesTypes{
  allTypes {
    _id
    name
    icon
  }
}
`

export const CREATE_ROBOT = gql`mutation add($fields: Object) {
  createRobot(fields: $fields) {
    _id
  }
}
`

export const UPDATE_ROBOT = gql`mutation update($_id: String, $fields: Object) {
  updateRobot(_id: $_id,fields: $fields) {
    _id
  }
}
`
