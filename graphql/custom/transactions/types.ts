import { gql } from 'apollo-server-micro';

const CustomTransactionsTypes = gql`
  type Mutation {
    upsertTransaction(data: TransactionInput, where: TransactionWhereUniqueInput!): Transaction
  }
  input TransactionInput {
    create: TransactionCreateInput
    update: TransactionUpdateInputCustom
  }

  input TransactionUpdateInputCustom {
    amount: Float
    date: DateTime
    description: String
  }
`;

export { CustomTransactionsTypes };