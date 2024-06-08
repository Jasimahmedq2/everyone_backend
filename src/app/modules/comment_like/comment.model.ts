import { Schema, model } from "mongoose";
import { IComment } from "./comment_like.interface";

const CommentSchema = new Schema<IComment>(
  {
    post_id: { type: Schema.Types.ObjectId, ref: "post", required: true },
    user_id: { type: Schema.Types.ObjectId, ref: "user", required: true },
    text: { type: String, default: "" },
    files: [{ type: String, default: "" }],
    likes: [{ type: Schema.Types.ObjectId, ref: "user" }],
    sub_comments: [{ type: Schema.Types.ObjectId, ref: "comment" }],
  },
  { timestamps: true }
);

export const Comment = model<IComment>("comment", CommentSchema);
