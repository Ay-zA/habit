import { hashSync, genSaltSync } from 'bcryptjs';

export const hashPassword = (password) => {
  const salt = genSaltSync(10);

  return hashSync(password, salt);
};
