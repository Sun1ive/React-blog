import { Sequelize, Model } from 'sequelize';
import models from '../models';
import * as I from '../@Types/credentials';
import * as U from '../@Types/user';

export const createUser = ({ email, password }: I.ICredentials): U.UserModel => {
  return models.User.create({
    email,
    password
  });
};
