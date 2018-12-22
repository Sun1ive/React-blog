import Sequelize from 'sequelize';

export interface UserAttributes {
  id: string;
  createdAt?: Date;
  updatedAt?: Date;
  accessToken?: string;
  refreshToken?: string;
  email: string;
  password: string;
}

export interface IUserInstance extends Sequelize.Instance<UserAttributes>, UserAttributes {}

export interface refreshToken {
  refreshToken: string;
}
