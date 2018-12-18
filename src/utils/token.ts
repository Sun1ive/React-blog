import { sign, verify } from 'jsonwebtoken';
import nanoid from 'nanoid';

import { JWT_SECRET } from '../../config';
import * as T from '../@Types/token';

export const generateAccessToken = ({ id }: T.tokenId) =>
  sign(
    {
      data: id
    },
    JWT_SECRET,
    {
      expiresIn: '1h'
    }
  );

export const generateRefreshToken = () => nanoid();

export const checkExpToken = (token: string): boolean | Error => {
  try {
    const decoded: T.decoded = verify(token, JWT_SECRET) as T.decoded;
    const currentTime = Date.now() / 1000;

    return decoded.exp > currentTime;
  } catch (error) {
    throw error;
  }
};
