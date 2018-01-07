import { isInstance } from 'apollo-errors';
import { createResolver } from 'apollo-resolvers';
import { AlreadyAuthenticatedError, UnauthorizedError, UnknownError } from './errors';

export const baseResolver = createResolver(null, (root, args, context, err) => {
  if (isInstance(err)) {
    return err;
  }
  return new UnknownError({
    data: {
      name: err.name
    }
  });
});

export const isAuthenticatedResolver = baseResolver.createResolver((root, args, context) => {
  if (!context.user) throw new UnauthorizedError();
});

export const isNotAuthenticatedResolver = baseResolver.createResolver((root, args, context) => {
  if (context.user) throw new AlreadyAuthenticatedError();
});
