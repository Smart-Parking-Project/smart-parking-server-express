import { UserInputError } from 'apollo-server-express';
import { hash, compare } from 'bcryptjs';
import { result } from 'lodash';
import { issueToken, serializeUser } from '../../helpers';
import {
  validateRegisterInput,
  validateLoginInput,
} from '../../validators/user';

export default {
  Query: {
    getAllUsers: async (_, {}, { User }) => {
      let users = await User.find();
      return users;
    },
    getUserById: async (_, { id }, { User }) => {
      let users = await User.findById(id);
      return users;
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
      user = user.toObject();
      user.id = user._id;
      user = serializeUser(user);
      let token = await issueToken(user);
      return {
        user,
        token,
      };
    },
    authUserProfile: async (_, {}, { user }) => user,
  },
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

      const newUser = new User({
        username,
        email,
        password,
        firstName,
        lastName,
      });
      newUser.password = await hash(password, 10);
      let result = await newUser.save();
      result = result.toObject();
      result.id = result._id;
      result = serializeUser(result);
      let token = await issueToken(result);
      return {
        user: result,
        token,
      };
    },
    editUserByID: async (_, { updatedUser, id }, { User }) => {
      let editedUser = await User.findByIdAndUpdate(
        id,
        { ...updatedUser },
        { new: true }
      );
      return editedUser;
    },
  },
};
