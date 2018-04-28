import { createResolver } from 'apollo-resolvers';
import { isAuthenticatedResolver } from '<server>/<api>/modules/alc.resovler';
import userController from './user.controller';

const allUsers = createResolver((root, arg, { models: { User } }) => userController.getAll());

const profile = isAuthenticatedResolver.createResolver((root, arg, ctx) => ctx.user);

export default {
  Query: {
    allUsers,
    profile,
  },
  User: {
    name: root => root.name || root.email.match(/^([^@]*)@/)[1],
  },
};
