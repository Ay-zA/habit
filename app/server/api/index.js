import { graphqlExpress } from 'apollo-server-express';
import { Router } from 'express';
import expressPlayground from 'graphql-playground-middleware-express';
import mongoose from 'mongoose';
import { formatError } from '<api>/modules/graphql.errors';
import { schema } from './graphql.schema';

const graphQLRouter = new Router();

const graphqlExpressHandler = (req) => {
  const { models } = mongoose;

  const user = req.user ? models.User.findById(req.user.id) : Promise.resolve(null);
  const context = { models, user };

  return { schema, context, formatError };
};

graphQLRouter.use('/graphql', graphqlExpress(graphqlExpressHandler));
graphQLRouter.get('/playground', expressPlayground({ endpoint: '/api/graphql' }));

export default graphQLRouter;
