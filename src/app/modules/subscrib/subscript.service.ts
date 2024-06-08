import ApiError from "../../../errors/apiError";
import { Subscribe } from "./subscrib.model";
import { Types } from "mongoose";

const subscribeToChannel = async (id: string, userId: number) => {
  const userObjectId = new Types.ObjectId(userId);
  const result = await Subscribe.findOne({ subscrib_id: id });
  if (!result) {
    throw new ApiError(404, "channel not found");
  }

  if (result.subscribed_user.includes(userObjectId)) {
    throw new ApiError(400, "User already subscribed");
  }

  result.subscribed_user.push(userObjectId);

  await result.save();

  return result;
};

// unsubscribe
const unsubscribeFromChannel = async (id: string, userId: number) => {
  const userObjectId = new Types.ObjectId(userId);

  const result = await Subscribe.findOne({ subscrib_id: id });
  if (!result) {
    throw new ApiError(404, "channel not found");
  }

  if (!result.subscribed_user.includes(userObjectId)) {
    throw new ApiError(400, "User is not subscribed");
  }

  result.subscribed_user = result.subscribed_user.filter(
    (user) => !user.equals(userObjectId)
  );

  await result.save();

  return result;
};

export const SubscribeService = {
  subscribeToChannel,
  unsubscribeFromChannel,
};
