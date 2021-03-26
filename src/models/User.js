import { Schema, model } from 'mongoose';

const UserSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      unique: true,
    },
    firstName: {
      type: String,
      required: false,
    },
    lastName: {
      type: String,
      required: false,
    },
    isAdmin: {
      type: Boolean,
      required: true,
    },
  },
  { timestamps: true }
);

const User = model('users', UserSchema);

export default User;
