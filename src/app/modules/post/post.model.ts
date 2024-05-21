import { Schema, model } from "mongoose";
import { IPost } from "./post.interface";
import { ACCESS_POST, PostType } from "./post.constant";

const PostSchema: Schema = new Schema<IPost>(
  {
    user_id: { type: Schema.Types.ObjectId, ref: "user", required: true },
    text: { type: String, required: true },
    files: [{ type: String }],
    access_post: {
      enum: ACCESS_POST,
      type: String,
      default: "public",
    },
    post_type: {
      enum: PostType,
      type: String,
      default: "common",
    },
  },
  { timestamps: true }
);

export const Post = model<IPost>("post", PostSchema);
