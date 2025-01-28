import { gql } from 'apollo-server-micro';

const UPSERT_TRANSACTION = gql`
  mutation UpsertTransaction(
    $where: TransactionWhereUniqueInput!
    $data: TransactionInput
  ) {
    upsertTransaction(where: $where, data: $data) {
      id
      description
      amount
      date
    }
  }
`;

const DELETE_TRANSACTION = gql`
  mutation DeleteTransaction($where: TransactionWhereUniqueInput!) {
    deleteTransaction(where: $where) {
      id
      description
    }
  }
`;

export { UPSERT_TRANSACTION, DELETE_TRANSACTION };
