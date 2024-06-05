import { Schema } from "mongoose";

export interface IProfile {
  user: Schema.Types.ObjectId;
  image: string;
  bio: string;
  user_name: string;
  birthday: Date;
  user_name_updated: Date;
  gender: string;
  password: string;
  new_password: string;
  name: string;
}
