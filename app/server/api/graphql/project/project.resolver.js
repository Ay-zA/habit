import { createResolver } from 'apollo-resolvers';
import { isAuthenticatedResolver } from '<api>/modules/alc.resovler';

const allProjects = createResolver((root, args, { models: { Project } }) => Project.find());
const createProject = isAuthenticatedResolver.createResolver((root, args, { models: { Project }, user }) => Project.create(args));

export const projectResolvers = {
  Query: {
    allProjects,
  },
  Mutation: {
    createProject,
  },
};
