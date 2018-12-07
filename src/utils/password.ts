import * as bcrypt from 'bcrypt';

export const hashPassword = (password: string): string => {
  const salt = bcrypt.genSaltSync(10);
  const hash = bcrypt.hashSync(password, salt);

  return hash;
};

export const comparePasswords = (password: string, hash: string): boolean =>
  bcrypt.compareSync(password, hash);
