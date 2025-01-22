import { gql } from 'apollo-server-micro';

const UserTypes = gql`
  type User {
    id: ID!
    name: String
    email: String!
    emailVerified: DateTime
    image: String
    accounts: [Account]
    sessions: [Session]
    createdAt: DateTime!
    updatedAt: DateTime!
  }

  type Query {
    users: [User]
    user(id: String!): User
  }

  input UserCreateInput {
    name: String
    email: String!
    emailVerified: DateTime
    image: String
  }

  input UserWhereUniqueInput {
    id: String!
  }

  input UserUpdateInput {
    name: StringInput
    email: StringInput
    emailVerified: DateTimeInput
    image: StringInput
  }

  type Mutation {
    createUser(data: UserCreateInput): User

    updateUser(where: UserWhereUniqueInput!, data: UserUpdateInput): User

    deleteUser(where: UserWhereUniqueInput!): User
  }
`;
export { UserTypes };
