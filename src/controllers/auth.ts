import models from '../models';
import * as I from '../@Types/credentials';
import * as U from '../@Types/user';
import { generateUUID } from '../utils/uuid';
import { hashPassword } from '../utils/password';

export const createUser = ({ email, password }: I.ICredentials): U.UserAddModel => {
  return models.User.create({
    id: generateUUID(),
    email,
    password: hashPassword(password)
  });
};

export const getUserByEmail = async (email: string): Promise<U.UserAddModel> => {
  const user = await models.User.findOne({
    attributes: ['id', 'password', 'email', 'refreshToken', 'accessToken'],
    where: {
      email
    }
  });

  return user.get({ plain: true });
};

export const updateUser = ({ id, ...rest }: any): U.UserAddModel => {
  return models.User.update(
    {
      ...rest
    },
    {
      where: {
        id
      }
    }
  );
};
