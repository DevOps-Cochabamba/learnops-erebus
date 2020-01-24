import Koa from 'koa'
import { ApolloServer } from 'apollo-server-koa'
import bodyParser from 'koa-bodyparser'
import cors from '@koa/cors'

import { logger } from '../logger'
import { get } from '../settings'
import { typeDefs, resolvers } from './graphql'
import { conditionalJsonWebToken } from './jwt'
import { router } from './router'

function context({ ctx }) {
  return ctx.state
}

export async function start() {
  const { host, port } = get('service')

  const app = new Koa()
  const playground = { settings: { 'editor.cursorShape': 'line' } }
  const apolloServer = new ApolloServer({ introspection: true, typeDefs, resolvers, playground, context, subscriptions: '/subscriptions' })

  app.use(conditionalJsonWebToken).use(bodyParser()).use(cors())
  apolloServer.applyMiddleware({ app, cors: true })  
  app.use(router.middleware()).use(router.allowedMethods())

  const server = app.listen(port, host, () => {
    logger.info(`Server Created, Ready to listen at ${host}:${port}${apolloServer.graphqlPath}`)
  })
  apolloServer.installSubscriptionHandlers(server)
}
