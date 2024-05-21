import { Schema, model } from "mongoose";
import { IComment } from "./comment_like.interface";

const CommentSchema = new Schema<IComment>(
  {
    post_id: { type: Schema.Types.ObjectId, ref: "post", required: true },
    user_id: { type: Schema.Types.ObjectId, ref: "user", required: true },
    text: { type: String, default: "" },
    file: { type: String, default: "" },
  },
  { timestamps: true }
);

export const Comment = model<IComment>("comment", CommentSchema);
