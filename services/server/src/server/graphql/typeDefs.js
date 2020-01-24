export const scalars = `
  scalar Object
  scalar Date
`

export const BackendInfo = `
  type BackendInfo {
    name: String!
    version: String!
  }
`

export const Type = `
  type Type {
    _id: String!

    name: String!
    description: String
    state: String
    icon: String
    detail: String
    control: String
    simulator: String
    actions: String

    userId: String

    createdAt: Date
    updatedAt: Date
    _v: Int!
  }
`

export const Robot = `
  type Robot {
    _id: ID!

    name: String
    description: String
    icon: String
    mode: String
    stream: String
    session: String!

    source: String!

    type: Type
    typeId: String
    userId: String

    createdAt: Date
    updatedAt: Date
    _v: Int!
  }
`

export const Query = `
  type Query {
    _info: BackendInfo!
    _date: Date
    me: Object

    type(_id: String): Type
    allTypes: [Type!]!

    robot(_id: String): Robot
    allRobots(source: String): [Robot!]!

    token(_id: String!): Object!
  }
`

export const Mutation = `
  type Mutation {
    createType(fields: Object): Type
    updateType(_id: String, fields: Object): Type
    deleteType(_id: String): Type

    createRobot(fields: Object): Robot
    updateRobot(_id: String, fields: Object): Robot
    deleteRobot(_id: String): Robot

    createControlToken(token: String!, ref: String!): String!
  }
`

export const Subscription = `
  type Subscription {
    watchRobots: Robot
  }
`

export const typeDefs = [scalars, BackendInfo, Type, Robot, Query, Mutation, Subscription]
