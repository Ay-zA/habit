import { GraphQLError } from 'graphql';
import { formatError as apolloFormatError, createError } from 'apollo-errors';
import ApiErrors from '<api>/errors';

export const UnknownError = createError(ApiErrors.UnknownError, {
  message: 'An unknown error has occurred',
});

export const UnauthorizedError = createError(ApiErrors.UnauthorizedError, {
  message: 'You must login to continue',
});

export const AlreadyAuthenticatedError = createError(ApiErrors.AlreadyAuthenticatedError, {
  message: 'You are already authenticated',
});

export const ForbiddenError = createError(ApiErrors.ForbiddenError, {
  message: 'Forbidden!',
});

export const CreateNotFoundError = resource =>
  createError(ApiErrors.NotFoundError, {
    message: `${resource} Not Found`,
    data: {
      path: resource,
      status: 404,
    },
  });

export const CreateAlreadyExistedError = resource =>
  createError(ApiErrors.AlreadyExistedError, {
    message: `${resource} already existed`,
    data: {
      path: resource,
      status: 409,
    },
  });

export const formatError = (error) => {
  let e = apolloFormatError(error);

  if (e instanceof GraphQLError) {
    e = apolloFormatError(new UnknownError({
      data: {
        originalMessage: e.message,
        originalError: e.name,
      },
    }));
  }

  return e;
};
