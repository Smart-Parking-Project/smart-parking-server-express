import { UserInputError } from 'apollo-server-express';
import { hash, compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';

import {
  validateRegisterInput,
  validateLoginInput,
} from '../../validators/user';
import { SECRET } from '../../config';

function createToken(user) {
  return sign(
    {
      id: user.id,
      email: user.email,
      username: user.username,
    },
    SECRET,
    { expiresIn: '1h' }
  );
}

export default {
  Mutation: {
    createNewUser: async (
      _,
      {
        newUser: {
          username,
          email,
          password,
          confirmPassword,
          firstName,
          lastName,
        },
      },
      { User }
    ) => {
      const { valid, errors } = validateRegisterInput(
        username,
        email,
        password,
        confirmPassword
      );

      if (!valid) {
        throw new UserInputError('Errors', { errors });
      }

      let user = await User.findOne({ username });
      if (user) {
        throw new UserInputError('Username is already taken.', {
          errors: {
            username: 'This username is taken.',
          },
        });
      }

      user = await User.findOne({ email });
      if (user) {
        throw new UserInputError('Email is already in use.', {
          errors: {
            email: 'This email taken.',
          },
        });
      }

      password = await hash(password, 12);

      const newUser = new User({
        username,
        email,
        password,
        firstName,
        lastName,
      });

      let result = await newUser.save();

      const token = createToken(result);

      return {
        ...result._doc,
        id: result._id,
        token,
      };
    },
    authenticateUser: async (_, { username, password }, { User }) => {
      const { valid, errors } = validateLoginInput(username, password);

      if (!valid) {
        throw new UserInputError('Errors', { errors });
      }

      let user = await User.findOne({ username });
      if (!user) {
        errors.general = 'User not found.';
        throw new UserInputError('User not found.', { errors });
      }
      let isEqual = await compare(password, user.password);
      if (!isEqual) {
        errors.general = 'Wrong credentials.';
        throw new UserInputError('Invalid password.', { errors });
      }

      const token = createToken(user);

      return {
        ...user._doc,
        id: user._id,
        token,
      };
    },
  },
};
