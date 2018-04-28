import { graphqlExpress } from 'apollo-server-express';
import { Router } from 'express';
import expressPlayground from 'graphql-playground-middleware-express';
import { graphqlExpressHandler } from './graphql';

const graphQLRouter = new Router();

graphQLRouter.use('/graphql', graphqlExpress(graphqlExpressHandler));
graphQLRouter.get('/playground', expressPlayground({ endpoint: '/api/graphql' }));

export default graphQLRouter;
