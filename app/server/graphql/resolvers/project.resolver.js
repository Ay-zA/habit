import { createResolver } from 'apollo-resolvers';
import { isAuthenticatedResolver } from './alc.resovler';

const allProjects = createResolver((root, args, { models: { Project } }) => Project.find());
const createProject = isAuthenticatedResolver.createResolver((root, args, { models: { Project }, user }) => Project.create(args));

export default {
  Query: {
    allProjects
  },
  Mutation: {
    createProject
  }
};
