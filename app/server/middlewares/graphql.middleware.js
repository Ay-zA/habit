import { createExpressContext } from 'apollo-resolvers';
import { graphqlExpress, graphiqlExpress } from 'apollo-server-express';
import schema from '@/graphql/schema';
import { formatError } from '@/graphql/errors';
import * as models from '@/api/entities';

export const addGraphQL = (app) => {
  app.use(
    '/graphql',
    graphqlExpress((req, res) => {
      const { user } = req;
      const context = createExpressContext({ models, user }, res);

      return {
        schema,
        formatError,
        context
      };
    })
  );
  app.use('/graphiql', graphiqlExpress({ endpointURL: '/graphql' }));
};
