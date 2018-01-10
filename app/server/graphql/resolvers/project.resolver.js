import { createResolver } from 'apollo-resolvers';

const allProjects = createResolver((root, args, { models: { Project } }) => Project.find());
const createProject = createResolver((root, args, { models: { Project } }) => Project.create(args));

export default {
  Query: {
    allProjects
  },
  Mutation: {
    createProject
  }
};
