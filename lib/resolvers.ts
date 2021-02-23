import {
  QueryResolvers,
  MutationResolvers,
  SubscriptionResolvers,
} from './type-defs.graphqls'

import { ResolverContext } from './apollo'
import console from 'console'
import { api } from './automatization'

const userProfile = {
  id: String(1),
  name: 'John Smith',
  status: 'cached',
}

const Query: Required<QueryResolvers<ResolverContext>> = {
  viewer(_parent, _args, _context, _info) {
    return userProfile
  },
  async devices() {
    return await api.devices()
  },
}

const Mutation: Required<MutationResolvers<ResolverContext>> = {
  updateName(_parent, _args, _context, _info) {
    console.log(`setting a new name to ${_args.name}`)
    userProfile.name = _args.name
    return userProfile
  },
}

const Subscription: Required<SubscriptionResolvers<ResolverContext>> = {
  deviceUpdated: {
    subscribe: async () => {
      console.log('someone has open connection...')
      await api.ensureInit()
      return api.pubsub.asyncIterator('LIKE')
    },
  },
}

export default { Query, Mutation, Subscription }
