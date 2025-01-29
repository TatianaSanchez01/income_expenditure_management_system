import { gql } from 'apollo-server-micro'

const TransactionTypes = gql`
  type Transaction {
    id: ID!
    userId: String!
    amount: Float!
    description: String!
    date: DateTime!
    createdAt: DateTime!
    updatedAt: DateTime!
    user: User!
  }

  type Query {
    transactions: [Transaction]
    transaction(id: String!): Transaction
  }

  input TransactionCreateInput {
    userId: String!
    amount: Float!
    description: String!
    date: DateTime!
  }

  input TransactionWhereUniqueInput {
    id: String!
  }

  input TransactionUpdateInput {
    userId: StringInput
    amount: FloatInput
    description: StringInput
    date: DateTimeInput
  }

  type Mutation {
    createTransaction(data: TransactionCreateInput): Transaction

    updateTransaction(
      where: TransactionWhereUniqueInput!
      data: TransactionUpdateInput
    ): Transaction

    deleteTransaction(where: TransactionWhereUniqueInput!): Transaction
  }
`
export { TransactionTypes }
