import { gql } from 'apollo-server-micro'

const SessionTypes = gql`
  type Session {
    sessionToken: String!
    userId: String!
    expires: DateTime!
    user: User!
    createdAt: DateTime!
    updatedAt: DateTime!
  }

  type Query {
    sessions: [Session]
    session(id: String!): Session
  }

  input SessionCreateInput {
    sessionToken: String!
    userId: String!
    expires: DateTime!
  }

  input SessionWhereUniqueInput {
    id: String!
  }

  input SessionUpdateInput {
    sessionToken: StringInput
    userId: StringInput
    expires: DateTimeInput
  }

  type Mutation {
    createSession(data: SessionCreateInput): Session

    updateSession(
      where: SessionWhereUniqueInput!
      data: SessionUpdateInput
    ): Session

    deleteSession(where: SessionWhereUniqueInput!): Session
  }
`
export { SessionTypes }
