export default {
  Query: {
    getAllUsers: async (_, {}, { User }) => {
      let users = await User.find();
      return users;
    },
    getUser: async () => {},
  },
  Mutation: {
    createNewUser: async (_, { newUser }, { User }) => {
      let createdUser = await User.create(newUser);
      return createdUser;
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
