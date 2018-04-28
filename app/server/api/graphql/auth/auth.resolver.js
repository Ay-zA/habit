import { isNotAuthenticatedResolver } from '<api>/modules/alc.resovler';
import * as authController from './auth.controller';

const createUser = isNotAuthenticatedResolver.createResolver(
  authController.createUser,
  authController.alreadyExistHandler,
);

const login = isNotAuthenticatedResolver.createResolver(authController.login);

export const authResolvers = {
  Mutation: {
    createUser,
    login,
  },
};
