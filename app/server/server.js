import express from 'express';
import { GraphQLServer } from 'graphql-yoga';
import { app, pathes } from '~/configs';
import { models } from './db';
import { webpackHtml, middlewares } from './middlewares';
import { resolvers, typeDefs } from './graphql';

const context = ({ request }) => {
  const user = request.user ? models.User.findById(request.user.id) : Promise.resolve(null);
  return { models, user };
};

export const graphqlServer = new GraphQLServer({ typeDefs, resolvers, context });
graphqlServer.use(middlewares);
graphqlServer.use(express.static(pathes.public));

if (app.isDev) {
  graphqlServer.get(/^(?!\/graphql).*/g, webpackHtml);
}
