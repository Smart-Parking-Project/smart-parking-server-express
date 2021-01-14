import { ApolloError } from 'apollo-server-express';
import { hash, compare } from 'bcryptjs';
import { result } from 'lodash';
import { issueToken, serializeUser } from '../../helpers';

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
      try {
        let user = await User.findOne({ username });
        if (!user) {
          throw new Error('User not found.');
        }
        let isEqual = await compare(password, user.password);
        if (!isEqual) {
          throw new Error('Invalid password.');
        }
        user = user.toObject();
        user.id = user._id;
        user = serializeUser(user);
        let token = await issueToken(user);
        return {
          user,
          token,
        };
      } catch (err) {
        throw new ApolloError(err.message, 403);
      }
    },
    authUserProfile: async (_, {}, { user }) => user,
  },
  Mutation: {
    createNewUser: async (_, { newUser }, { User }) => {
      try {
        let { username, email } = newUser;
        let user;
        user = await User.findOne({ username });
        if (user) {
          throw new Error('Username is already taken.');
        }
        user = await User.findOne({ email });
        if (user) {
          throw new Error('Email is already in use.');
        }
        user = new User(newUser);
        user.password = await hash(newUser.password, 10);
        let result = await user.save();
        result = result.toObject();
        result.id = result._id;
        result = serializeUser(result);
        let token = await issueToken(result);
        return {
          user: result,
          token,
        };
      } catch (err) {
        throw new ApolloError(err.message, 400);
      }
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
