import { Schema, model } from "mongoose";
import { IFollow } from "./follow.interface";

const followSchema = new Schema<IFollow>(
  {
    follower: { type: Schema.Types.ObjectId, ref: "user", required: true },
    followed: { type: Schema.Types.ObjectId, ref: "user", required: true },
  },
  { timestamps: true }
);

export const Follow = model<IFollow>("follow", followSchema);
