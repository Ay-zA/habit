import { combineResolvers } from 'apollo-resolvers';

import User from './user.resolver';
import Project from './project.resolver';
import Auth from './auth.resolver';

export const resolvers = combineResolvers([
  Auth,
  User,
  Project
]);
