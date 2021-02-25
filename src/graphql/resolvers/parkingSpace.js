export default {
  Mutation: {
    createParkingSpace: async (
      _,
      { newSpace: { spaceNumber, parkingLotIdentifier, isOccupied } },
      { ParkingSpace }
    ) => {
      const newParkingSpace = new ParkingSpace({
        spaceNumber,
        parkingLotIdentifier,
        isOccupied,
      });

      let result = await newParkingSpace.save();

      return {
        ...result._doc,
        id: result._id,
      };
    },
    updateParkingSpace: async (
      _,
      {
        id,
        parkingSpaceDetails: { spaceNumber, parkingLotIdentifier, isOccupied },
      },
      { ParkingSpace }
    ) => {
      let parkingSpace = await ParkingSpace.findOne({ _id: id });

      if (!parkingSpace) {
        let msg = 'parkingSpace not found.';
        throw new UserInputError(msg, {
          errors: {
            id: 'provided space id not Found.',
          },
        });
      }

      if (spaceNumber) {
        parkingSpace.spaceNumber = spaceNumber;
      }

      if (parkingLotIdentifier) {
        parkingSpace.parkingLotIdentifier = parkingLotIdentifier;
      }

      if (isOccupied != null) {
        parkingSpace.isOccupied = isOccupied;
      }

      await parkingSpace.save();
      return {
        id: parkingSpace._id,
        spaceNumber: parkingSpace.spaceNumber,
        parkingLotIdentifier: parkingSpace.parkingLotIdentifier,
        isOccupied: parkingSpace.isOccupied,
      };
    },
  },
  Query: {
    getAllParkingSpace: async (_, args, { ParkingSpace }) => {
      return ParkingSpace.find({});
    },
  },
};
