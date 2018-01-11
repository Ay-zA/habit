import { createResolver } from 'apollo-resolvers';
import { AlreadyExistedError, NotFoundError } from '../errors';

const signup = createResolver(
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

const signin = createResolver(async (root, { data }, { models: { User } }) => {
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
