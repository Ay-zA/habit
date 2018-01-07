import { makeExecutableSchema } from 'graphql-tools';
import { projectResolver } from './resolvers/project.resolver';

const typeDefs = `
  type Task {
    id: ID!
    title: String!
  }

  type Project {
    id: ID!
    title: String!
    tasks: [Task]!
  }

  type Query {
    allProjects: [Project]
  }
`;

export default makeExecutableSchema({ typeDefs, resolvers: projectResolver });
