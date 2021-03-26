import { mongoose } from 'mongoose';
const lodash = require('lodash');
import parkingSession from '../typeDefs/parkingSession';

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
    paidForSession: async (_, { id, hasPaid }, { ParkingSession }) => {
      let parkingSession = await ParkingSession.findOne({ _id: id });

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
        ...result._doc,
        id: result._id,
      };
    },
  },
  Query: {
    getAllUserParkingSessions: async (_, args, { ParkingSession }) => {
      return ParkingSession.find({});
    },
    getAllCurrentUserParkingSessions: async (_, { id }, { ParkingSession }) => {
      let parkingSessions = await ParkingSession.find({
        userId: id,
      });

      if (parkingSession.length === 0) {
        let msg = 'No parking sessions found for this user';
        throw new UserInputError(msg, {
          errors: {
            id: 'Provided userid has no corresponding parking sessions',
          },
        });
      }
      return parkingSessions;
    },
    // getRecentParkingSession: async (_, args, { ParkingSession }) => {
    //   let currentTime = new Date();
    //   let hours = currentTime.getHours();
    //   let min = currentTime.getMinutes();
    //   let sec = currentTime.getSeconds();
    //   //console.log(`${hours}${min}${sec}`);
    //   let current = `${hours}${min}${sec}`;
    //   console.log(current);
    //   let allSessions = await ParkingSession.find({});
    //   let enterTime = lodash.toNumber(
    //     allSessions[0].enterTime.replace(/:/g, '')
    //   );

    //   console.log(enterTime);
    //   return true;
    // },
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
