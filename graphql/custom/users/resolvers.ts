import prisma from '@/config/prisma';

const UserCustomResolvers = {
  User: {},
  Query: {
    getUserByEmail: async (_: any, args: any) => {
      return await prisma.user.findUnique({
        where: {
          email: args.email,
        },
      });
    },
  },
  Mutation: {
    createUserCustom: async (_: any, args: any) => {
      return await prisma.user.create({
        data: args.data,
      });
    },
  },
};

export { UserCustomResolvers };
