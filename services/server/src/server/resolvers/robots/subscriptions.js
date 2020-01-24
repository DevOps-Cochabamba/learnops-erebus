import { PubSub } from 'graphql-subscriptions'
const pubsub = new PubSub()

export const watchRobots = {
  resolve: (payload) => payload,
  subscribe: () => pubsub.asyncIterator(['ROBOTS'])
}
