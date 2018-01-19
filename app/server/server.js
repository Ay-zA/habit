import express from 'express';
import { GraphQLServer } from 'graphql-yoga';
import { app, pathes } from '~/configs';
import { models } from './db';
import { webpackIndex, middlewares } from './middlewares';
import { resolvers, typeDefs } from './graphql';

const context = req => ({ models });

export const graphqlServer = new GraphQLServer({ typeDefs, resolvers, context });
graphqlServer.use(middlewares);
graphqlServer.use(express.static(pathes.public));

if (app.isDev) {
  graphqlServer.get('/', webpackIndex);
}
