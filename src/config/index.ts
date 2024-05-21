import path from "path";
import dotenv from "dotenv";

dotenv.config({ path: path.join(process.cwd(), ".env") });

export default {
  db_string: process.env.DB_STRING,
  port: process.env.PORT,
  env: process.env.NODE_ENV,
  bcrypt_salt_rounds: process.env.BCRYPT_SALT_ROUNDS,
  jwt: {
    access_secret: process.env.ACCESS_SECRET,
    access_expire: process.env.ACCESS_EXPIRE,
    verify_secret: process.env.VERIFY_SECRET,
    verify_email_expire: process.env.VERIFY_EMAIL_EXPIRE,
  },
  google: {
    client_id: process.env.GOOGLE_CLIENT_ID,
    client_secret: process.env.GOOGLE_CLIENT_SECRET,
  },
  facebook: {
    client_id: process.env.FACEBOOK_CLIENT_ID,
    client_secret: process.env.FACEBOOK_CLIENT_SECRET,
  },
  aws: {
    bucket_name: process.env.BUCKET_NAME,
    bucket_origin: process.env.BUCKET_ORIGIN,
    access_key: process.env.AWS_USER_ACCESS_KEY,
    secret_key: process.env.AWS_USER_SECRET_KEY,
  },
  my_email: process.env.MY_EMAIL,
  my_password: process.env.MY_PASSWORD,
  session_secret: process.env.SESSION_SECRET,
};
