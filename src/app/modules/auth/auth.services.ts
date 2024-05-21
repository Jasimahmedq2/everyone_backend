import { Secret } from "jsonwebtoken";
import config from "../../../config";
import ApiError from "../../../errors/apiError";
import { JwtHelpers } from "../../../shared/jwtHelpers";
import { ILogin, ILoginResponse, IUser } from "./auth.interfaces";
import { User } from "./auth.models";
import bcrypt from "bcrypt";
import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: config.my_email,
    pass: config.my_password,
  },
});

const createUser = async (payload: IUser) => {
  payload.password = await bcrypt.hash(
    payload.password,
    Number(config.bcrypt_salt_rounds)
  );

  const isExistUser = await User.findOne({
    email: payload.email,
    phone_no: payload.phone_no,
  });

  console.log({ isExistUser });

  // if (isExistUser) {
  //   throw new ApiError(401, "user already exist");
  // }

  const createSecret = await JwtHelpers.createToken(
    { email: payload.email },
    config.jwt.verify_secret as Secret,
    config.jwt.verify_email_expire as string
  );

  console.log({ createSecret });

  if (isExistUser) {
    if (!isExistUser.is_verified) {
      const mailOptions = {
        from: config.my_email,
        to: payload.email,
        subject: "verify your email",
        html: `
      <P>Hello ${payload.name}, please verify your email</p>
      <a href="http://localhost:3000/verify/${createSecret}/" target="_blank">Click here to verify your email</a>`,
      };
      const result = await transporter.sendMail(mailOptions);

      return result;
    } else {
      throw new ApiError(200, "already you have a account, please login.");
    }
  } else {
    await User.create(payload);

    const mailOptions = {
      from: config.my_email,
      to: payload.email,
      subject: "verify your email",
      html: `
    <P>Hello ${payload.name}, please verify your email</p>
    <a href="http://localhost:3000/verify/${createSecret}/" target="_blank">Click here to verify your email</a>`,
    };
    const result = await transporter.sendMail(mailOptions);

    return result;
  }
};

const LogIn = async (payload: ILogin): Promise<ILoginResponse> => {
  const isUserExist = await User.findOne({ email: payload.email });
  console.log({
    access_token: config.jwt.access_secret,
    expire: config.jwt.access_expire,
  });
  if (!isUserExist) {
    throw new ApiError(404, "user doesn't exist");
  }

  if (!isUserExist.is_verified) {
    throw new ApiError(
      401,
      "please verify your email first, then try to login"
    );
  }

  const isPasswordMatched = await bcrypt.compare(
    payload.password,
    isUserExist.password
  );

  if (!isPasswordMatched) {
    throw new ApiError(401, "something went wrong");
  }

  const accessToken = await JwtHelpers.createToken(
    {
      userId: isUserExist?._id,
      role: isUserExist?.role,
    },
    config.jwt.access_secret as Secret,
    config.jwt.access_expire as string
  );

  return {
    is_verified: isUserExist.is_verified,
    userId: isUserExist._id.toString(),
    email: isUserExist.email,
    role: isUserExist.role,
    token: accessToken,
  };
};

const verifyEmailAndUpdateStatus = async (
  token: string
): Promise<IUser | null> => {
  console.log({ token });
  const verifyToken = await JwtHelpers.verifyToken(
    token,
    config.jwt.verify_secret as Secret
  );

  if (!verifyToken || !verifyToken.email) {
    throw new ApiError(
      401,
      "maybe your verification time is expired, please try again"
    );
  }

  const email = verifyToken.email;

  const result = await User.findOneAndUpdate(
    { email },
    { $set: { is_verified: true } }
  );

  return result;
};

export const AuthUserServices = {
  createUser,
  LogIn,
  verifyEmailAndUpdateStatus,
};
