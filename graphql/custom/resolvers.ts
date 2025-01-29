import { TransactionCustomResolvers } from './transactions/resolvers'
import { UserCustomResolvers } from './users/resolvers'

const customResolvers = [UserCustomResolvers, TransactionCustomResolvers]

export { customResolvers }
