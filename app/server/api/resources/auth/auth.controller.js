import { User } from '../user/user.model';

const signUp = async (req, res, next) => {
  try {
    const user = new User(req.body);
    await user.save();
    res.json(user.toAuthJSON());
  } catch (e) {
    next(e);
  }
};

const signIn = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.authenticate(email, password);

    if (!user) {
      throw new Error('Not Found');
    }

    res.json(user.toAuthJSON());
  } catch (e) {
    next(e);
  }
};

export default {
  signUp,
  signIn
};
