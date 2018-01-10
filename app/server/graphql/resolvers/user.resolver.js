import { createResolver } from 'apollo-resolvers';
import { isAuthenticatedResolver } from './alc.resovler';
import { AlreadyExisted, ForbiddenError } from '../errors';

const updateMyProfile = isAuthenticatedResolver.createResolver((root, { input }, { user, models: { UserModel } }) => {
  if (!user.isAdmin && input.id !== user.id) {
    throw new ForbiddenError();
  }
  return UserModel.update(input);
});

const createUser = createResolver(
  async (
    root,
    { name, authProvider: { local: { email, password } } },
    { models: { User } }
  ) => {
    const userInfo = { email, name, password };
    const newUser = new User(userInfo);
    await newUser.save();
    return newUser;
  },
  (root, arg, context, err) => {
    if (err.code === 11000) {
      throw new AlreadyExisted({
        data: {
          resource: 'User'
        }
      });
    }
  }
);

const allUsers = createResolver((root, arg, { models: { User } }) =>
  User.find());

export default {
  Query: {
    allUsers
  },
  Mutation: {
    createUser
  },
  User: {
    name: root => root.name || root.email.match(/^([^@]*)@/)[1]
  }
};
