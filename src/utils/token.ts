import { sign, decode, verify } from 'jsonwebtoken';
import { JWT_SECRET } from '../../config';

interface ICredentials {
  id: string;
}

export const generateAccessToken = ({ id }: ICredentials) =>
  sign(
    {
      data: id
    },
    JWT_SECRET,
    {
      expiresIn: '1h'
    }
  );

export const generateRefreshToken = ({ id }: ICredentials) =>
  sign(
    {
      data: id
    },
    JWT_SECRET,
    {
      expiresIn: '6h'
    }
  );

export const checkExpToken = (token: string): boolean | Error => {
  try {
    const decoded = verify(token, JWT_SECRET);
    const currentTime = Date.now() / 1000;

    console.log(checkExpToken);
    // return decoded > currentTime;
    return true;
  } catch (error) {
    throw error;
  }
};
