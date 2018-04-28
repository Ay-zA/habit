import { isNotAuthenticatedResolver } from '<api>/modules/alc.resovler';
import * as authController from './auth.controller';

const signup = isNotAuthenticatedResolver.createResolver(
  authController.signup,
  authController.alreadyExistHandler
);

const signin = isNotAuthenticatedResolver.createResolver(authController.signin);

export const authResolvers = {
  Mutation: {
    signup,
    signin
  }
};
