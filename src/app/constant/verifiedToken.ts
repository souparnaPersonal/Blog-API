import jwt, { JwtPayload } from 'jsonwebtoken';
import config from '../config';
export const verifyToken = (token: string) => {
  let withoutBearer = '';
  if (token.startsWith('Bearer ')) {
    withoutBearer = token.split(' ')[1]; //
  }

  const decoded = jwt.verify(
    withoutBearer,
    config.jwt_secrect_token as string,
  ) as JwtPayload;

  console.log(decoded);

  return decoded;
};
