import { Schema, model } from "mongoose";
import { ILike } from "./comment_like.interface";

const LikeSchema = new Schema({
  post_id: { type: Schema.Types.ObjectId, ref: "post", required: true },
  user_id: { type: Schema.Types.ObjectId, ref: "user", required: true },
});

export const Like = model<ILike>("like", LikeSchema);
