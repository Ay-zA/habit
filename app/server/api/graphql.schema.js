import { combineResolvers } from 'apollo-resolvers';
import { GraphQLUpload } from 'apollo-upload-server';
import { makeExecutableSchema } from 'graphql-tools';
import { projectResolvers } from './resources/project';
import typeDefs from './resources/index.graphql';

const resolvers = combineResolvers([projectResolvers]);
const uploadMixin = typeDefs.includes('scalar Upload') ? { Upload: GraphQLUpload } : {};

export const schema = makeExecutableSchema({
  typeDefs,
  resolvers: {
    ...uploadMixin,
    ...resolvers
  }
});
