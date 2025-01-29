import prisma from 'config/prisma'

const TransactionResolvers = {
  Transaction: {
    user: async (parent: any, _: any) => {
      return await prisma.user.findUnique({
        where: {
          id: parent.userId,
        },
      })
    },
  },
  Query: {
    transactions: async () => {
      return await prisma.transaction.findMany({})
    },
    transaction: async (_: any, args: any) => {
      return await prisma.transaction.findUnique({
        where: {
          id: args.id,
        },
      })
    },
  },
  Mutation: {
    createTransaction: async (_: any, args: any) => {
      return await prisma.transaction.create({
        data: { ...args.data, date: new Date(args.data.date).toISOString() },
      })
    },
    updateTransaction: async (_: any, args: any) => {
      return await prisma.transaction.update({
        where: {
          id: args.where.id,
        },
        data: {
          ...args.data,
          ...(args.data.date && {
            date: new Date(args.data.date).toISOString(),
          }),
        },
      })
    },
    deleteTransaction: async (_: any, args: any) => {
      return await prisma.transaction.delete({
        where: {
          id: args.where.id,
        },
      })
    },
  },
}

export { TransactionResolvers }
