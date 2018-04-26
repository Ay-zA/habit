import { AlreadyExistedError, NotFoundError } from '<api>/modules/graphql.errors';
import { isNotAuthenticatedResolver } from '<api>/modules/alc.resovler';

const signup = isNotAuthenticatedResolver.createResolver(
  async (root, { data }, { models: { User } }) => {
    try {
      const user = new User(data);
      await user.save();
      return user.toAuthJSON();
    } catch (e) {
      throw e;
    }
  },
  (root, arg, ctx, err) => {
    if (err.code === 11000) {
      throw new AlreadyExistedError({ data: { resource: 'User' } });
    }
  }
);

const signin = isNotAuthenticatedResolver.createResolver(async (root, { data }, { models: { User } }) => {
  const { email, password } = data;
  const user = await User.authenticate(email, password);

  if (!user) {
    throw new NotFoundError({ data: { resource: 'User' } });
  }
  return user.toAuthJSON();
});

export const AuthResolver = {
  Mutation: {
    signup,
    signin
  }
};
