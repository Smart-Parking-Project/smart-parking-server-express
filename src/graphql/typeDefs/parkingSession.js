import { gql } from 'apollo-server-express';

export default gql`
  extend type Query {
    getCurrentParkingSession(id: ID!): ParkingSession!
    getAllCurrentUserParkingSessions(id: ID!): [ParkingSession]
    getAllUserParkingSessions: [ParkingSession]
  }

  extend type Mutation {
    createParkingSession(
      userId: ID!
      newSession: CreateParkingSessionInput!
    ): ParkingSession!
    endParkingSession(endSession: EndParkingSessionInput!): ParkingSession!
    paidForSession(id: ID!, hasPaid: Boolean!): ParkingSession!
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
