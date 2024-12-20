import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.join((process.cwd(), '.env')) });

export default {
  port: process.env.PORT,
  database_url: process.env.DATABASE_URL,
  jwt_secrect_token: process.env.JWT_SECRET,
  jwt_refresh_token: process.env.JWT_REFRESH,
};
