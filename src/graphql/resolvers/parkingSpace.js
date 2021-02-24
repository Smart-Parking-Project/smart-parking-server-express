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
  },
};
