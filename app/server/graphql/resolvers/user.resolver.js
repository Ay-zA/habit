import { isAuthenticatedResolver } from './alc.resovler';
import { ForbiddenError } from './errors';

const updateMyProfile = isAuthenticatedResolver.createResolver((root, { input }, { user, models: { UserModel } }) => {
  if (!user.isAdmin && input.id !== user.id) {
    throw new ForbiddenError();
  }
  return UserModel.update(input);
});

export default {
  Mutation: {
    updateMyProfile
  }
};
