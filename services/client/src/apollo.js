import ApolloClient from 'apollo-client'
import { HttpLink } from 'apollo-link-http'
import { setContext } from 'apollo-link-context'
import { InMemoryCache } from 'apollo-cache-inmemory'

export function buildApolloClient() {
  const graphqlUri = process.env.REACT_APP_BACKEND

  const httpLink = new HttpLink({
    uri: graphqlUri,
    useGETForQueries: false
  })

  const authLink = setContext((_, { headers }) => {
    const token = localStorage.getItem('x-erebus-token')
    return {
      headers: {
        ...headers,
        authorization: token ? `Bearer ${token}` : '',
      }
    }
  })

  const link = authLink.concat(httpLink)

  return new ApolloClient({ link, cache: new InMemoryCache() })
}

export const client = buildApolloClient()
