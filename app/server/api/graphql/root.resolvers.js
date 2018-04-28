import { combineResolvers } from 'apollo-resolvers';
import { authResolvers } from './auth';
import { projectResolvers } from './project';

export default combineResolvers([authResolvers, projectResolvers]);
