import { User } from '../user';

export async function signup(req, res, next) {
  try {
    const user = await User.create(req.body);
    return res.status(201).json(user.toAuthJSON());
  } catch (e) {
    return next(e);
  }
}

export function login(req, res, next) {
  res.status(200).json(req.user.toAuthJSON());
  return next();
}
