export const projectResolver = {
  Query: {
    allProjects: (root, args, { models: { Project } }) => Project.find()
  }
};
