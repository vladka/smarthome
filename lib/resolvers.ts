import { QueryResolvers, MutationResolvers, User } from './type-defs.graphqls'
import { ResolverContext } from './apollo'
import console from 'console'
import { db } from './firebase/db'

const defaultProfile: User = {
  id: String(1),
  name: 'John Smith',
  status: 'cached',
}

const Query: Required<QueryResolvers<ResolverContext>> = {
  async viewer(_parent, _args, _context, _info) {
    const docRef = db.collection('users').doc('abcdef')
    const doc = await docRef.get()

    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    return doc.exists ? (doc.data()! as User) : defaultProfile
  },
}

const Mutation: Required<MutationResolvers<ResolverContext>> = {
  async updateName(_parent, args, _context, _info) {
    const docRef = db.collection('users').doc('abcdef')

    const doc = {
      status: 'cached',
      id: 'abcdef',
      name: args.name,
    }
    await docRef.set(doc)
    console.log(`set a new name to ${args.name}`)
    return doc
  },
}

export default { Query, Mutation }
