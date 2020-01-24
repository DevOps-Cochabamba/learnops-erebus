import gql from 'graphql-tag'

export const ALL_TYPES = gql`query allTypes {
  allTypes {
    _id
    name
    icon
    state
    detail
    actions
    simulator
    control
    description
    createdAt
  }
}
`

export const CREATE_TYPE = gql`mutation add($fields: Object) {
    createType(fields: $fields) {
      _id
    }
  }
`

export const UPDATE_TYPE = gql`mutation update($_id: String, $fields: Object) {
  updateType(_id: $_id,fields: $fields) {
    _id
  }
}
`
