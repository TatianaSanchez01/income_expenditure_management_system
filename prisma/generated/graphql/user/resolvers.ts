import prisma from 'config/prisma'

const UserResolvers = {
  User: {
    accounts: async (parent: any, _: any) => {
      return await prisma.account.findMany({
        where: {
          user: {
            is: {
              id: {
                equals: parent.id,
              },
            },
          },
        },
      })
    },
    sessions: async (parent: any, _: any) => {
      return await prisma.session.findMany({
        where: {
          user: {
            is: {
              id: {
                equals: parent.id,
              },
            },
          },
        },
      })
    },
    transactions: async (parent: any, _: any) => {
      return await prisma.transaction.findMany({
        where: {
          user: {
            is: {
              id: {
                equals: parent.id,
              },
            },
          },
        },
      })
    },
  },
  Query: {
    users: async () => {
      return await prisma.user.findMany({})
    },
    user: async (_: any, args: any) => {
      return await prisma.user.findUnique({
        where: {
          id: args.id,
        },
      })
    },
  },
  Mutation: {
    createUser: async (_: any, args: any) => {
      return await prisma.user.create({
        data: {
          ...args.data,
          emailVerified: new Date(args.data.emailVerified).toISOString(),
        },
      })
    },
    updateUser: async (_: any, args: any) => {
      return await prisma.user.update({
        where: {
          id: args.where.id,
        },
        data: {
          ...args.data,
          ...(args.data.emailVerified && {
            emailVerified: new Date(args.data.emailVerified).toISOString(),
          }),
        },
      })
    },
    deleteUser: async (_: any, args: any) => {
      return await prisma.user.delete({
        where: {
          id: args.where.id,
        },
      })
    },
  },
}

export { UserResolvers }
