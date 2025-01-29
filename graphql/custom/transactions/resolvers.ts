import prisma from '@/config/prisma'

const TransactionCustomResolvers = {
  User: {},
  Query: {},
  Mutation: {
    upsertTransaction: async (_: any, args: any) => {
      return await prisma.transaction.upsert({
        create: args.data.create,
        update: args.data.update,
        where: args.where,
      })
    },
  },
}

export { TransactionCustomResolvers }
