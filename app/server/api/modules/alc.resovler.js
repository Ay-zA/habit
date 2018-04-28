import { isInstance } from 'apollo-errors';
import { createResolver } from 'apollo-resolvers';
import logger from '<utils>/logger';
import { AlreadyAuthenticatedError, UnauthorizedError, UnknownError } from './graphql.errors';

export const baseResolver = createResolver(null, (root, args, ctx, err) => {
  if (isInstance(err)) {
    return err;
  }

  logger.error(err);
  logger.error(err.stack);

  return new UnknownError({
    detail: { name: err.name },
  });
});

export const isAuthenticatedResolver = baseResolver.createResolver(async (root, args, ctx) => {
  const user = await ctx.user;

  if (!user) {
    throw new UnauthorizedError();
  } else {
    ctx.user = user;
  }
});

export const isNotAuthenticatedResolver = baseResolver.createResolver(async (root, args, ctx) => {
  const user = await ctx.user;

  if (user) {
    throw new AlreadyAuthenticatedError();
  }
});
