import { Types } from "mongoose";

export interface IComment {
  post_id: Types.ObjectId;
  user_id: Types.ObjectId;
  text?: string;
  files?: string[];
  sub_comments?: Types.ObjectId[];
  likes?: Types.ObjectId[];
}

export interface ILike {
  post_id: string;
  user_id: string;
}
