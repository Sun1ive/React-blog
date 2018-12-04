import { Sequelize, DataTypes } from 'sequelize';
import * as T from '../@Types/user';

export default (sequelize: Sequelize, DataTypes: DataTypes) => {
  const attributes = {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      unique: true,
      onDelete: 'CASCADE',
      primaryKey: true
    },
    email: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    }
  };

  const User = sequelize.define<T.UserModel, T.UserAddModel>(
    'User',
    attributes
  );

  return User;
};
