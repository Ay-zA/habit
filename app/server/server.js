import express from 'express';
import addMiddlewares, { webpackIndex, addErrorHandlers } from '@/middlewares';
import { GraphQLServer } from 'graphql-yoga';
import * as models from '@/db';
import { app, pathes } from '~/configs';
import { resolvers } from './graphql/resolvers';
import typeDefs from './graphql/schema/index.graphql';

const context = req => ({ models });
export const graphqlServer = new GraphQLServer({ typeDefs, resolvers, context });

addMiddlewares(graphqlServer.express);
graphqlServer.express.use(express.static(pathes.public));
addErrorHandlers(graphqlServer.express);

if (app.isDev) {
  graphqlServer.express.get('/', webpackIndex);
}
