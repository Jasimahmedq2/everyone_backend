import jwt, { JwtPayload, Secret } from "jsonwebtoken";

const createToken = async (
  payload: object,
  secret: Secret,
  expireDate: string
) => {
  return jwt.sign(payload, secret, { expiresIn: expireDate });
};

const verifyToken = (token: string, secret: Secret): JwtPayload => {
  return jwt.verify(token, secret) as JwtPayload;
};

export const JwtHelpers = {
  createToken,
  verifyToken,
};
