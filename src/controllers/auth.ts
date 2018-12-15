import { generateUUID } from '../utils/uuid';
import { hashPassword } from '../utils/password';
import * as T from '../@Types/user';
import models from '../models';

export const createUser = async ({
  email,
  password
}: {
  email: string;
  password: string;
}): Promise<T.UserAttributes> => {
  return models.User.create({
    id: generateUUID(),
    email,
    password: hashPassword(password)
  });
};

export const getUserByEmail = async (email: string): Promise<T.UserAttributes> => {
  const user = (await models.User.findOne({
    attributes: ['id', 'password', 'email', 'refreshToken', 'accessToken'],
    where: {
      email
    }
  })) as T.IUserInstance;

  return user.get({
    plain: true
  });
};

export const updateUser = async ({ id, ...rest }: any): Promise<void> => {
  await models.User.update(
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
