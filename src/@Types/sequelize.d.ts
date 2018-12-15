import * as Sequelize from 'sequelize';
import * as U from './user';
import { DataTypeAbstract, DefineAttributeColumnOptions } from 'sequelize';

type SequelizeAttribute = string | DataTypeAbstract | DefineAttributeColumnOptions;

export type SequelizeAttributes<T extends { [key: string]: any }> = {
  [P in keyof T]: SequelizeAttribute
};

import { IUserInstance } from '../@Types/user';

export interface DbInterface {
  sequelize: Sequelize.Sequelize;
  Sequelize: Sequelize.SequelizeStatic;
  User: Sequelize.Model<IUserInstance, U.UserAttributes>;
}
