import { gql } from 'apollo-server-express';

export default gql`
  extend type Mutation {
    createParkingSpace(newSpace: ParkingSpaceInput!): ParkingSpace!
  }

  input ParkingSpaceInput {
    spaceNumber: Float!
    parkingLotIdentifier: String!
    isOccupied: Boolean
  }

  type ParkingSpace {
    id: ID!
    spaceNumber: Float!
    parkingLotIdentifier: String!
    isOccupied: Boolean
  }
`;
