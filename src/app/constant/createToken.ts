import { JwtPayload } from 'jsonwebtoken';
import jwt from 'jsonwebtoken';

export const createToken = (jwtPayload: JwtPayload, secret: string) => {
  return jwt.sign({ ...jwtPayload }, secret, {
    expiresIn: '1d',
  });
};
