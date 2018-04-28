import { AlreadyExistedError, NotFoundError } from '<api>/modules/graphql.errors';
import abstractController from '<api>/modules/abstract-controller';

export const signup = async (root, { data }, { models: { User } }) => {
  try {
    const user = await abstractController.createOne(User, data);
    return user.toAuthJSON();
  } catch (e) {
    throw e;
  }
};

export const signin = async (root, { data }, { models: { User } }) => {
  const { email, password } = data;

  const user = await User.authenticate(email, password);

  if (!user) {
    throw new NotFoundError({ data: { resource: 'User' } });
  }

  return user.toAuthJSON();
};

export const alreadyExistHandler = (root, arg, ctx, err) => {
  if (err.code === 11000) {
    throw new AlreadyExistedError({ data: { resource_name: 'User' } });
  }
};
