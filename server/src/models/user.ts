import { Sequelize, DataTypes } from 'sequelize';

export default (sequelize: Sequelize, DataTypes: DataTypes) => {
  const User = sequelize.define('User', {
    id: {
      type: DataTypes.UUID,
      unique: true,
      onDelete: 'CASCADE',
      primaryKey: true
    },
    email: {
      type: DataTypes.STRING,
      unique: true
    },
    password: {
      type: DataTypes.STRING
    }
  });

  return User;
};
