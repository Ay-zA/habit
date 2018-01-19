import express from 'express';
import { GraphQLServer } from 'graphql-yoga';
import { app, pathes } from '~/configs';
import { resolvers } from './graphql/resolvers';
import * as models from './db';
import { webpackIndex, middlewares } from './middlewares';
import typeDefs from './graphql/schema/index.graphql';

const context = req => ({ models });

export const graphqlServer = new GraphQLServer({ typeDefs, resolvers, context });
graphqlServer.express.use(middlewares);
graphqlServer.express.use(express.static(pathes.public));

if (app.isDev) {
  graphqlServer.express.get('/', webpackIndex);
}
