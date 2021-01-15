import { gql } from 'apollo-server-express';

export default gql`
  extend type Query {
    getAllUsers: [User!]!
    getUserById(id: ID!): User!
    authenticateUser(username: String!, password: String!): AuthResp!
    authUserProfile: User! @isAuth
  }

  extend type Mutation {
    createNewUser(newUser: UserInput!): AuthResp!
    editUserByID(updatedUser: UserInput!, id: ID!): User!
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
    firstName: String
    lastName: String
  }

  type AuthResp {
    user: User!
    token: String!
  }
`;
