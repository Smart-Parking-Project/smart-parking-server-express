import { gql } from 'apollo-server-express';

export default gql`
  extend type Query {
    getAllParkingSpace: [ParkingSpace]
  }

  extend type Mutation {
    createParkingSpace(newSpace: ParkingSpaceInput!): ParkingSpace!
    updateParkingSpace(
      id: ID!
      parkingSpaceDetails: ParkingSpaceDetailsInput!
    ): ParkingSpace!
  }

  input ParkingSpaceDetailsInput {
    spaceNumber: Float
    parkingLotIdentifier: String
    isOccupied: Boolean
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
