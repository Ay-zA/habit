import { graphqlExpress } from 'apollo-server-express';
import { GraphQLUpload } from 'apollo-upload-server';
import { Router } from 'express';
import expressPlayground from 'graphql-playground-middleware-express';
import { models } from '<server>/db';
import { makeExecutableSchema } from 'graphql-tools';
import { resolvers } from './resolvers';
import { formatError } from './errors';
import typeDefs from './schema/index.graphql';

const graphQLRouter = new Router();

const uploadMixin = typeDefs.includes('scalar Upload') ? { Upload: GraphQLUpload } : {};

const schema = makeExecutableSchema({
  typeDefs,
  resolvers: {
    ...uploadMixin,
    ...resolvers
  }
});

const context = (req) => {
  const user = req.user ? models.User.findById(req.user.id) : Promise.resolve(null);
  return { models, user };
};

graphQLRouter.use(
  '/graphql',
  graphqlExpress(req => ({ schema, context: context(req), formatError }))
);
graphQLRouter.get('/playground', expressPlayground({ endpoint: '/api/graphql' }));

export default graphQLRouter;
