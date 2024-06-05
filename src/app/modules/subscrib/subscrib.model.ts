import { Schema, model } from "mongoose";
import { ISubscrib } from "./subscrib.interface";

const SubscribSchema = new Schema<ISubscrib>(
  {
    post_id: {
      type: Schema.Types.ObjectId,
      ref: "post",
    },
    subscrib_id: {
      type: String,
    },
    amount_required: {
      type: Number,
      default: 0,
    },
    subscribed_user: [{ type: Schema.Types.ObjectId, ref: "user" }],
    paid_users: [{ type: Schema.Types.ObjectId, ref: "user" }],
  },
  { timestamps: true }
);
export const Subscribe = model<ISubscrib>("subscrib", SubscribSchema);
