export default parkingSession;

export default {
  Mutation: {
    createParkingSession: async (
      _,
      {
        newSession: {
          enterTime,
          exitTime,
          enterDate,
          exitDate,
          payAmount,
          hasPaid,
          userId,
        },
      },
      { ParkingSession }
    ) => {
      const newParkingSession = new ParkingSession({
        enterTime,
        exitTime,
        enterDate,
        exitDate,
        payAmount,
        hasPaid,
        userId,
      });

      let result = await newParkingSession.save();

      return {
        ...result._doc,
        id: result._id,
      };
    },
  },
};
