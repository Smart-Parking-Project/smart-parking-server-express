import { gql } from 'apollo-server-express';

export default gql`
  extend type Mutation {
    createNewUser(newUser: UserInput!): User!
    authenticateUser(username: String!, password: String!): User!
  }

  input UserInput {
    username: String!
    email: String!
    password: String!
    confirmPassword: String!
    firstName: String
    lastName: String
  }

  type User {
    id: ID!
    username: String!
    email: String!
    token: String!
    firstName: String
    lastName: String
  }
`;
