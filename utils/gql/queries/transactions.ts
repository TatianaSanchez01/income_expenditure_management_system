import { gql } from 'apollo-server-micro';

const GET_TRANSACTIONS = gql`
  query Transactions {
    transactions {
      id
      amount
      description
      date
      user {
        id
        name
      }
    }
  }
`;

const GET_TRANSACTION_BY_ID = gql`
  query Transaction($transactionId: String!) {
    transaction(id: $transactionId) {
      createdAt
      amount
      description
      date
    }
  }
`;

const GET_FINANCIAL_REPORT = gql`
  query Transactions {
    transactions {
      amount
      description
      date
      user {
        name
      }
    }
  }
`;

export { GET_TRANSACTIONS, GET_TRANSACTION_BY_ID, GET_FINANCIAL_REPORT };
