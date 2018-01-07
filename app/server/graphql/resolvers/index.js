import { combineResolvers } from 'apollo-resolvers';

import User from './user.resolver';

const resolvers = combineResolvers([
  User
]);

export default resolvers;
