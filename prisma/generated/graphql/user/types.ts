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
    transactions: [Transaction]
    role: Enum_RoleName!
    phone: String
    createdAt: DateTime!
    updatedAt: DateTime!
    deleted: Boolean!
    enabled: Boolean!
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
    role: Enum_RoleName!
    phone: String
    deleted: Boolean!
    enabled: Boolean!
  }

  input UserWhereUniqueInput {
    id: String!
  }

  input UserUpdateInput {
    name: StringInput
    email: StringInput
    emailVerified: DateTimeInput
    image: StringInput
    role: Enum_RoleNameInput
    phone: StringInput
    deleted: BooleanInput
    enabled: BooleanInput
  }

  type Mutation {
    createUser(data: UserCreateInput): User

    updateUser(where: UserWhereUniqueInput!, data: UserUpdateInput): User

    deleteUser(where: UserWhereUniqueInput!): User
  }
`;
export { UserTypes };
