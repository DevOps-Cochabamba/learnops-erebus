import gql from 'graphql-tag'

export const query = gql`
  query robot($id: String) {
    robot(_id: $id) {
      _id
      name
      description
      icon
      mode
      stream
      session
      source
      type {
        name
        description
        icon
        detail
        control
        simulator
        control
        actions
      }
      createdAt
      updatedAt
    }
  }
`