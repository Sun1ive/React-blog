import { Model } from 'sequelize';

export interface UserAddModel {
  email: string;
  password: string;
}

export interface UserModel extends Model<UserModel, UserAddModel> {
  id: string;
  email: string;
  password: string;
  createdAt?: string;
  updatedAt?: string;
}
