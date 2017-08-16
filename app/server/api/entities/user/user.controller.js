import User from './user.model';

export async function signUp(req, res, next) {
  try {
    const user = await User.create(req.body);
    return res.status(201).json(user);
  } catch (e) {
    res.status(500);
    return next(e);
  }
}

export function login(req, res, next) {
  res.status(200).json(req.user);
  return next();
}