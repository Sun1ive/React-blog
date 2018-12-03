import * as fs from 'fs';
import * as path from 'path';
import * as Sequelize from 'sequelize';

import sequelize from '../services/sequelize';

interface IDB {
  [key: string]: Sequelize.Model<any, any>;
}

const db: IDB = {};

fs.readdirSync(__dirname) // eslint-disable-line no-sync
  .filter((file: string) => file.indexOf('.') !== 0 && file !== 'index.js')
  .forEach((file: string) => {
    const model = sequelize.import(path.join(__dirname, file));
    db[model.name] = model;
  });

Object.keys(db).forEach(modelName => {
  if ('associate' in db[modelName]) {
    db[modelName].associate(db);
  }
});

(db.sequelize as any) = sequelize;

module.exports = db;
