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
    payAmount: Float
    hasPaid: Boolean!
    userId: ID!
  }

  input EndParkingSessionInput {
    id: ID!
    exitTime: String!
    exitDate: String!
  }

  type ParkingSession {
    id: ID!
    enterTime: String!
    exitTime: String
    enterDate: String!
    exitDate: String!
    payAmount: Float
    hasPaid: Boolean!
    user: ID!
  }
`;
