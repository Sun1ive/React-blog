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

export const getUserByEmail = async (email: string): Promise<T.UserAttributes | undefined> => {
  const user = await models.User.findOne({
    attributes: ['id', 'password', 'email', 'refreshToken', 'accessToken'],
    where: {
      email
    }
  });

  let plainUser;

  if (user) {
    plainUser = user.get({
      plain: true
    });
  }

  return plainUser;
};

export const getUserById = async (id: string): Promise<T.UserAttributes | null> => {
  const user = await models.User.findOne({
    where: {
      id
    }
  });

  return user;
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

export const findRefreshToken = async ({
  refreshToken
}: T.refreshToken): Promise<T.UserAttributes | null> => {
  const user = await models.User.findOne({
    where: {
      refreshToken
    }
  });

  return user;
};
