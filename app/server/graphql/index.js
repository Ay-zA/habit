import { createExpressContext } from 'apollo-resolvers';
import { graphqlExpress, graphiqlExpress } from 'apollo-server-express';
import ExpressPlaygroundMiddleware from 'graphql-playground-middleware-express';
import { Router } from 'express';
import * as models from '@/api/entities';
import { formatError } from './errors';
import schema from './schema';

export const graphqlServer = new Router();

const graphqlMiddleware = graphqlExpress((req, res) => {
  const { user } = req;
  const context = createExpressContext({ models, user }, res);

  return { schema, formatError, context };
});

graphqlServer.use('/graphql', graphqlMiddleware);
graphqlServer.use('/graphiql', graphiqlExpress({ endpointURL: '/graphql' }));
graphqlServer.get('/playground', ExpressPlaygroundMiddleware({ endpoint: '/graphql' }));
