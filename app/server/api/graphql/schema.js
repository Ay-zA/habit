import { makeExecutableSchema } from 'graphql-tools';
import { GraphQLUpload } from 'apollo-upload-server';
import typeDefs from './root.graphql';
import resolvers from './root.resolvers';

const uploadMixin = typeDefs.includes('scalar Upload') ? { Upload: GraphQLUpload } : {};

export default makeExecutableSchema({
  typeDefs,
  resolvers: {
    ...uploadMixin,
    ...resolvers
  }
});
