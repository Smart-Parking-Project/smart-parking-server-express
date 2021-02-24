import { Schema, model } from 'mongoose';

const ParkingSpaceSchema = new Schema({
  spaceNumber: {
    type: Number,
    required: true,
    unique: true,
  },
  parkingLotIdentifier: {
    type: String,
    required: true,
  },
  isOccupied: {
    type: Boolean,
    required: true,
  },
});

const ParkingSpace = model('parkingSpace', ParkingSpaceSchema);

export default ParkingSpace;
