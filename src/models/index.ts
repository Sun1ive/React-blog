import { DB_HOST, DB_NAME, DB_PASSWORD, DB_PORT, DB_SSL, DB_USERNAME } from '../../config';

import * as Sequelize from 'sequelize';
import { UserFactory } from './user';
import { DbInterface } from '../@Types/sequelize';

export const createModels = (): DbInterface => {
  const sequelize = new Sequelize(DB_NAME, DB_USERNAME, DB_PASSWORD, {
    host: DB_HOST,
    port: DB_PORT,
    dialect: 'postgres',
    dialectOptions: {
      ssl: DB_SSL
    },
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    },
    operatorsAliases: false
  });

  const db: DbInterface = {
    sequelize,
    Sequelize,
    User: UserFactory(sequelize, Sequelize)
  };

  return db;
};

const db = createModels();

export default db;
