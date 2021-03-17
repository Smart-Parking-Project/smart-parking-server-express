import { Schema, model } from 'mongoose';

const ParkingSessionSchema = new Schema({
  enterTime: {
    type: String,
    required: true,
  },
  exitTime: {
    type: String,
    required: false,
  },
  elapsedTime: {
    type: String,
    required: false,
  },
  enterDate: {
    type: String,
    required: true,
  },
  exitDate: {
    type: String,
    required: false,
  },
  elapsedTime: {
    type: String,
    required: false,
  },
  payAmount: {
    type: String,
    required: false,
  },
  hasPaid: {
    type: Boolean,
    required: false,
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'users',
    required: true,
  },
});

const ParkingSession = model('parkingSession', ParkingSessionSchema);

export default ParkingSession;
