import * as models from '<models>';
import { formatError } from '<api>/modules/graphql.errors';
import schema from './schema';

export const graphqlExpressHandler = (req) => {
  const user = req.user ? models.User.findById(req.user.id) : Promise.resolve(null);
  const context = { models, user };

  return { schema, context, formatError };
};
