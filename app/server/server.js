import express from 'express';
import { GraphQLServer } from 'graphql-yoga';
import { models } from './db';
import middlewaresFactory, { webpackHtml } from './middlewares';
import { resolvers, typeDefs } from './graphql';

export default (config) => {
  const context = ({ request }) => {
    const user = request.user ? models.User.findById(request.user.id) : Promise.resolve(null);
    return { models, user };
  };

  const graphqlServer = new GraphQLServer({ typeDefs, resolvers, context });
  graphqlServer.use(middlewaresFactory(config));
  graphqlServer.use(express.static(config.path.public));

  if (config.env.isDev) {
    graphqlServer.get(/^(?!\/graphql).*/g, webpackHtml);
  }

  return graphqlServer;
};
