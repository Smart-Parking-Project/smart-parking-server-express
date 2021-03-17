import { gql } from 'apollo-server-express';

export default gql`
  extend type Query {
    getPaymentAmount(id: ID!): Float!
    getCurrentParkingSession(id: ID!): ParkingSession!
    getAllParkingSessions: [ParkingSession]
    getAllUserSessions: [ParkingSession]
  }

  extend type Mutation {
    createParkingSession(
      userId: ID!
      newSession: CreateParkingSessionInput!
    ): ParkingSession!
    endParkingSession(endSession: EndParkingSessionInput!): ParkingSession!
    paidForSession(hasPaid: Boolean!): ParkingSession!
  }

  input CreateParkingSessionInput {
    enterTime: String!
    exitTime: String
    enterDate: String!
    exitDate: String
    payAmount: String
    elapsedTime: String
    hasPaid: Boolean!
  }

  input EndParkingSessionInput {
    id: ID!
    exitTime: String!
    exitDate: String!
    elapsedTime: String!
  }

  type ParkingSession {
    id: ID!
    enterTime: String!
    exitTime: String
    enterDate: String!
    exitDate: String
    elapsedTime: String
    payAmount: String
    hasPaid: Boolean!
    userId: ID!
  }
`;
