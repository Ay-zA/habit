import { User } from './user.model';

export const getUsers = async (req, res, next) => {
  try {
    const users = await User.find();
    return res.json(users);
  } catch (e) {
    return next(e);
  }
};
