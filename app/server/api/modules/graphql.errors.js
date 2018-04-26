import { GraphQLError } from 'graphql';
import { formatError as apolloFormatError, createError } from 'apollo-errors';

export const UnknownError = createError('UnknownError', {
  message: 'An unknown error has occurred'
});

export const UnauthorizedError = createError('UnauthorizedError', {
  message: 'You must login to continue'
});

export const AlreadyAuthenticatedError = createError('AlreadyAuthenticatedError', {
  message: 'You are already authenticated'
});

export const ForbiddenError = createError('ForbiddenError', {
  message: 'Forbidden!'
});

export const NotFoundError = createError('NotFoundError', {
  message: 'Resource Not Found'
});

export const AlreadyExistedError = createError('AlreadyExistedError', {
  message: 'Resource already existed'
});

export const formatError = (error) => {
  let e = apolloFormatError(error);

  if (e instanceof GraphQLError) {
    e = apolloFormatError(new UnknownError({
      data: {
        originalMessage: e.message,
        originalError: e.name
      }
    }));
  }

  return e;
};
