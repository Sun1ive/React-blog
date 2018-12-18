import Sequelize from 'sequelize';
import * as T from '../@Types/user';
import { SequelizeAttributes } from '../@Types/sequelize';

export const UserFactory = (
  sequelize: Sequelize.Sequelize,
  DataTypes: Sequelize.DataTypes
): Sequelize.Model<T.IUserInstance, T.UserAttributes> => {
  const attributes: SequelizeAttributes<T.UserAttributes> = {
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
      allowNull: false,
      unique: true
    },
    accessToken: {
      type: DataTypes.STRING,
      allowNull: true,
      unique: true
    },
    refreshToken: {
      type: DataTypes.STRING,
      allowNull: true,
      unique: true
    }
  };

  const User = sequelize.define<T.IUserInstance, T.UserAttributes>('User', attributes);

  return User;
};
