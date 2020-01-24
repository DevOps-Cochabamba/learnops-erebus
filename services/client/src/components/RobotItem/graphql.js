import gql from 'graphql-tag'

export const CREATE_TOKEN = gql`mutation token($token: String!, $ref: String!) {
  createControlToken(token: $token, ref: $ref)
}
`
