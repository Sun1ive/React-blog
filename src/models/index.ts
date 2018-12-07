import * as fs from 'fs';
import * as path from 'path';
import sequelize from '../services/sequelize';

const db = {} as any;

fs.readdirSync(__dirname) // eslint-disable-line no-sync
  .filter((file: string) => file.indexOf('.') !== 0 && file !== 'index.ts')
  .forEach((file: string) => {
    const model = sequelize.import(path.join(__dirname, file));
    db[model.name] = model;
  });

Object.keys(db).forEach((modelName: any) => {
  if ('associate' in db[modelName]) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;

export default db;
