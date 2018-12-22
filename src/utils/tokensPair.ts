import { generateAccessToken, generateRefreshToken } from './token';

export const generateTokensPair = ({ id }: { id: string }) => {
  return {
    accessToken: generateAccessToken({ id }),
    refreshToken: generateRefreshToken()
  };
};
