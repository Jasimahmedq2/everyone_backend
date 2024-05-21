import { Types } from "mongoose";

export interface ISubscrib {
  post_id: Types.ObjectId;
  subscrib_id: string;
  amount_required: number;
  subscribed_user: Types.ObjectId[];
  paid_users: Types.ObjectId[];
}
