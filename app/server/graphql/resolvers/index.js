import { combineResolvers } from 'apollo-resolvers';

import User from './user.resolver';
import projectResolver from './project.resolver';

export const resolvers = combineResolvers([
  User,
  projectResolver
]);
