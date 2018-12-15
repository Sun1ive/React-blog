import { Sequelize, Model } from 'sequelize';
import models from '../models';
import * as I from '../@Types/credentials';
import * as U from '../@Types/user';
import { generateUUID } from '../utils/uuid';

export const createUser = ({ email, password }: I.ICredentials): U.UserModel => {
  return models.User.create({
    id: generateUUID(),
    email,
    password
  });
};

export const getUser = ({ email }: I.ICredentials): U.UserAddModel => {
  return models.User.findOne({
    where: {
      email
    }
  });
};
