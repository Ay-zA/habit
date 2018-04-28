import { CreateAlreadyExistedError, CreateNotFoundError } from '<api>/modules/graphql.errors';
import abstractController from '<api>/modules/abstract-controller';

const UserNotFound = CreateNotFoundError('user');
const UserAlreadyExistedError = CreateAlreadyExistedError('user');

export const createUser = async (root, { input }, { models: { User } }) => {
  try {
    const user = await abstractController.createOne(User, input);
    return user.toAuthJSON();
  } catch (e) {
    throw e;
  }
};

export const login = async (root, { input }, { models: { User } }) => {
  const { email, password } = input;

  const user = await User.authenticate(email, password);

  if (!user) {
    throw new UserNotFound();
  }

  return user.toAuthJSON();
};

export const alreadyExistHandler = (root, arg, ctx, err) => {
  if (err.code === 11000) {
    throw new UserAlreadyExistedError();
  }
};
