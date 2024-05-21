import mongoose, { Schema, model } from "mongoose";
import { IUser } from "./auth.interfaces";
import { UserRoleConstant } from "./auth.constant";

const UserModel = new Schema<IUser>(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    name: {
      type: String,
    },
    role: {
      enum: UserRoleConstant,
      type: String,
      default: "user",
    },
    is_verified: {
      type: Boolean,
      default: false,
    },
    phone_no: {
      type: String,
      required: true,
    },
    login_with: {
      type: String,
      default: "",
    },
  },
  { timestamps: true }
);

export const User = model<IUser>("user", UserModel);
