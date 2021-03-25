export default {
  Mutation: {
    createParkingSession: async (
      _,
      {
        userId,
        newSession: {
          enterTime,
          exitTime,
          enterDate,
          exitDate,
          payAmount,
          hasPaid,
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
    endParkingSession: async (
      _,
      { endSession: { id, exitTime, exitDate, elapsedTime } },
      { ParkingSession }
    ) => {
      let parkingSession = await ParkingSession.findOne({ _id: id });
      // let userParkingSession = await ParkingSession.find({
      //   userId: '604ae17a5aa18f4be456e782',
      // });

      //console.log(userParkingSession);

      if (!parkingSession) {
        let msg = 'parkingSession not found.';
        throw new UserInputError(msg, {
          errors: {
            id: 'provided session id not Found.',
          },
        });
      }

      if (exitTime) {
        parkingSession.exitTime = exitTime;
      }

      if (exitDate) {
        parkingSession.exitDate = exitDate;
      }

      if (elapsedTime) {
        parkingSession.elapsedTime = elapsedTime;
      }
      parkingSession.payAmount = calculatePayment(elapsedTime);

      let result = await parkingSession.save();
      return {
        ...result._doc,
        id: result._id,
      };
    },
    paidForSession: async (_, { sessionId, hasPaid }, { ParkingSession }) => {
      let parkingSession = await ParkingSession.findOne({ _id: sessionId });

      if (!parkingSession) {
        let msg = 'parkingSession not found.';
        throw new UserInputError(msg, {
          errors: {
            id: 'provided session id not Found.',
          },
        });
      }

      if (hasPaid) {
        parkingSession.hasPaid = hasPaid;
      }

      let result = await parkingSession.save();
      return {
        ...result.doc,
        id: result._id,
      };
    },
  },
};

const calculatePayment = (time) => {
  let splitTime = time.split(':');
  let hours = splitTime[0];
  let minutes = splitTime[1];
  let seconds = splitTime[2];

  if (parseInt(minutes) > 0 || parseInt(seconds) > 0) {
    hours = parseInt(hours) + 1;
  }

  let amount = hours * 2;
  return '$' + amount.toString();
};
