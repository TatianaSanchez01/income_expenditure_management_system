import { gql } from 'apollo-server-micro'

const GET_USERS = gql`
  query Users {
    users {
      id
      name
      email
      phone
    }
  }
`

const GET_USER_BY_ID = gql`
  query User($userId: String!) {
    user(id: $userId) {
      name
      id
      role
    }
  }
`

const GET_USER_BY_EMAIL = gql`
  query GetUserByEmail($email: String) {
    getUserByEmail(email: $email) {
      id
    }
  }
`

export { GET_USERS, GET_USER_BY_ID, GET_USER_BY_EMAIL }
