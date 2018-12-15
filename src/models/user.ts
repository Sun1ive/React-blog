import { Sequelize, DataTypes } from 'sequelize';
import * as T from '../@Types/user';

export default (sequelize: Sequelize, DataTypes: DataTypes) => {
  const User = sequelize.define<T.UserModel, T.UserAddModel>('User', {
    id: {
      type: DataTypes.UUID,
      unique: true,
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
    },
    accessToken: {
      type: DataTypes.STRING,
      allowNull: true
    },
    refreshToken: {
      type: DataTypes.STRING,
      allowNull: true
    }
  });

  return User;
};
