import passport from 'passport';
import LocalStrategy from 'passport-local';

import User from '@/api/entities/user/user.model';

const localOpts = {
  usernameField: 'email'
};

const localStrategy = new LocalStrategy(localOpts, async (email, password, done) => {
  console.log('local');
  try {
    const user = await User.findOne({ email });
    console.log(email, password);
    console.log(user);

    if (!user) {
      return done(null, false);
    }

    if (!user.authenticate(password)) {
      return done(null, false);
    }

    return done(null, user);
  } catch (e) {
    return done(e, false);
  }
});

passport.use(localStrategy);

export const localAuth = passport.authenticate('local', { session: false });
