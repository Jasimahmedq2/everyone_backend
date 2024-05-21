import { Types } from "mongoose";

export interface IPost {
  user_id: Types.ObjectId;
  text?: string;
  files?: string[];
  access_post?: string;
  post_type?: string;
  pull: string[]
}

export interface IPull {
  post_id: Types.ObjectId;
  text: string;
  users: Types.ObjectId[];
}
