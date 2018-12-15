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

type decoded = {
  iat: number;
  exp: number;
};

export const checkExpToken = (token: string): boolean | Error => {
  try {
    const decoded: decoded = verify(token, JWT_SECRET) as decoded;
    const currentTime = Date.now() / 1000;

    return decoded.exp > currentTime;
  } catch (error) {
    throw error;
  }
};
