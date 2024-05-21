import mongoose, { Schema, model } from "mongoose";
import { IPull } from "./post.interface";

const PullSchema = new Schema<IPull>({
  post_id: {
    type: Schema.Types.ObjectId,
    ref: "post",
  },
  text: {
    type: String,
    require: true,
  },
  users: [{ type: Schema.Types.ObjectId, ref: "user" }],
});

export const pull = model<IPull>("pull", PullSchema);
