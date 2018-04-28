import { hashSync, genSaltSync } from 'bcrypt-nodejs';

export const hashPassword = (password) => {
  const salt = genSaltSync(10);

  return hashSync(password, salt);
};
