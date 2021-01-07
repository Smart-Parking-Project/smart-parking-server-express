import { gql } from 'apollo-server-express';

export default gql`
  extend type Query {
    getAllUsers: [User!]!
    getUser: User!
  }

  extend type Mutation {
    createNewUser(newUser: UserInput!): User!
    editUserByID(updatedUser: UserInput!, id: ID!): User!
  }

  input UserInput {
    username: String!
    email: String!
    password: String!
    firstName: String
    lastName: String
  }

  type User {
    id: ID!
    username: String!
    email: String!
    password: String!
    firstName: String
    lastName: String
  }
`;
