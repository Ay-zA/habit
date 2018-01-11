import { createResolver } from 'apollo-resolvers';

const allUsers = createResolver((root, arg, { models: { User } }) =>
  User.find());

export default {
  Query: {
    allUsers
  },
  User: {
    name: root => root.name || root.email.match(/^([^@]*)@/)[1]
  }
};
