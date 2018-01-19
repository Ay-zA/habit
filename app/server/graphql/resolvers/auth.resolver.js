import { AlreadyExistedError, NotFoundError } from '../errors';
import { isNotAuthenticatedResolver } from './alc.resovler';

const signup = isNotAuthenticatedResolver.createResolver(
  async (root, { data }, { models: { User } }) => {
    const user = new User(data);
    await user.save();
    return user.toAuthJSON();
  },
  (root, arg, ctx, err) => {
    if (err.code === 11000) {
      throw new AlreadyExistedError({ data: { resource: 'User' } });
    }
  }
);

const signin = isNotAuthenticatedResolver.createResolver(async (root, { data }, { models: { User } }) => {
  const user = await User.authenticate(data.email, data.password);
  if (!user) {
    throw new NotFoundError({ data: { resource: 'User' } });
  }
  return user.toAuthJSON();
});

export default {
  Mutation: {
    signup,
    signin
  }
};
