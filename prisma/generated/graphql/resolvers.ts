import { UserResolvers } from './user/resolvers'
import { AccountResolvers } from './account/resolvers'
import { SessionResolvers } from './session/resolvers'
import { VerificationTokenResolvers } from './verificationtoken/resolvers'
import { TransactionResolvers } from './transaction/resolvers'

export const resolvers = [
  UserResolvers,
  AccountResolvers,
  SessionResolvers,
  VerificationTokenResolvers,
  TransactionResolvers,
]
