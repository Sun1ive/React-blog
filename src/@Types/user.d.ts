import { Model } from 'sequelize';

export interface UserAddModel extends UserModel {
  id: string;
  email: string;
  password: string;
  accessToken: string;
  refreshToken: string;
}

export interface UserModel extends Model<UserModel, UserAddModel> {
  createdAt?: string;
  updatedAt?: string;
  get: (...args: any[]) => any;
}
