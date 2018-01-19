import { createResolver } from 'apollo-resolvers';
import { isAuthenticatedResolver } from './alc.resovler';

const allUsers = createResolver((root, arg, { models: { User } }) => User.find());

const profile = isAuthenticatedResolver.createResolver((root, arg, ctx) => ctx.user);

export default {
  Query: {
    allUsers,
    profile
  },
  User: {
    name: root => root.name || root.email.match(/^([^@]*)@/)[1]
  }
};
