import mongoose, { Types } from "mongoose";
import { Subscribe } from "../subscrib/subscrib.model";
import { IPost } from "./post.interface";
import { Post } from "./post.model";
import { pull } from "./pull.model";
import ApiError from "../../../errors/apiError";
import { counterService } from "../subscrib/counter.service";

const createPost = async (
  userId: number,
  location: string,
  payload: Partial<IPost>
) => {
  console.log({ payload });
  const session = await mongoose.startSession();
  session.startTransaction();
  try {
    const post = new Post({
      user_id: userId,
      text: payload?.text,
      files: [location],
      post_type: payload?.post_type,
      access_post: payload?.access_post,
    });
    const result: any = await post.save();
    const isBigChannel = payload?.channel_type === "bigChannel";

    const sequenceName = isBigChannel ? "bigChannel" : "normalChannel";
    const nextId = await counterService.getNextSequenceValue(sequenceName);

    const subscribe = new Subscribe({
      post_id: result._id,
      subscrib_id: `everyone-${nextId}`,
    });
    await subscribe.save();
    // create pull
    if (payload.post_type === "pull" && payload?.pull) {
      for (let i = 0; i < payload.pull.length; i++) {
        const elm = payload.pull[i];
        const createPull = await pull.create({
          post_id: result?._id,
          text: elm,
        });
      }
    }
    await session.commitTransaction();
  } catch (error) {
    await session.abortTransaction();
  }
};

const getFeedAllPost = async (userId: number) => {
  // const publicPost = await Post.aggregate([
  //   {
  //     $match: {
  //       post_type: { $in: ["pull", "common"] },
  //     },
  //   },
  //   {
  //     $lookup: {
  //       from: "pulls",
  //       localField: "_id",
  //       foreignField: "post_id",
  //       as: "pull",
  //     },
  //   },
  //   {
  //     $lookup: {
  //       from: "users",
  //       localField: "user_id",
  //       foreignField: "_id",
  //       as: "user",
  //     },
  //   },
  //   {
  //     $unwind: "$user",
  //   },
  //   {
  //     $lookup: {
  //       from: "profiles",
  //       localField: "user._id",
  //       foreignField: "user",
  //       as: "profile",
  //     },
  //   },
  //   {
  //     $unwind: "$profile",
  //   },
  //   {
  //     $lookup: {
  //       from: "subscribs",
  //       localField: "_id",
  //       foreignField: "post_id",
  //       as: "subscription",
  //     },
  //   },
  //   {
  //     $unwind: "$subscription",
  //   },
  //   {
  //     $project: {
  //       "user.password": 0,
  //       "user.sensitiveField1": 0,
  //       "user.sensitiveField2": 0,
  //     },
  //   },
  // ]);
  const publicPost = await Post.aggregate([
    {
      $match: {
        post_type: { $in: ["pull", "common"] },
      },
    },
    {
      $lookup: {
        from: "pulls",
        localField: "_id",
        foreignField: "post_id",
        as: "pull",
      },
    },
    {
      $lookup: {
        from: "users",
        localField: "user_id",
        foreignField: "_id",
        as: "user",
      },
    },
    {
      $unwind: {
        path: "$user",
        preserveNullAndEmptyArrays: true,
      },
    },
    {
      $lookup: {
        from: "profiles",
        localField: "user._id",
        foreignField: "user",
        as: "profile",
      },
    },
    {
      $unwind: {
        path: "$profile",
        preserveNullAndEmptyArrays: true,
      },
    },
    {
      $lookup: {
        from: "subscribs",
        localField: "_id",
        foreignField: "post_id",
        as: "subscription",
      },
    },
    {
      $unwind: {
        path: "$subscription",
        preserveNullAndEmptyArrays: true,
      },
    },
    {
      $sort: { createdAt: -1 },
    },
    {
      $project: {
        "user._id": 1,
        "user.name": 1,
        "user.email": 1,
        "profile.image": 1,
        text: 1,
        files: 1,
        pull: 1,
        post_type: 1,
        access_post: 1,
        createdAt: 1,
        subscription: 1,
      },
    },
  ]);

  // get private posts
  // const privatePost = await Post.aggregate([
  //   {
  //     $match: {
  //       post_type: { $in: ["pull", "common"] },
  //       access_post: "private",
  //     },
  //   },
  //   {
  //     $lookup: {
  //       from: "pulls",
  //       localField: "_id",
  //       foreignField: "post_id",
  //       as: "pull",
  //     },
  //   },
  //   {
  //     $lookup: {
  //       from: "users",
  //       localField: "_id",
  //       foreignField: "user_id",
  //       as: "users",
  //     },
  //   },
  // ]);

  // const postsWithPullsAndSubscriptions = await Post.aggregate([
  //   {
  //     $match: {
  //       post_type: { $in: ["pull", "common"] },
  //       access_post: "private",
  //     },
  //   },
  //   {
  //     $lookup: {
  //       from: "pulls",
  //       localField: "_id",
  //       foreignField: "post_id",
  //       as: "pulls",
  //     },
  //   },
  //   {
  //     $lookup: {
  //       from: "subscribes",
  //       localField: "_id",
  //       foreignField: "post_id",
  //       as: "subscriptions",
  //     },
  //   },
  //   {
  //     $addFields: {
  //       subscriptions: {
  //         $filter: {
  //           input: "$subscriptions",
  //           as: "subscription",
  //           cond: { $in: [userId, "$$subscription.paid_users"] },
  //         },
  //       },
  //     },
  //   },
  //   {
  //     $match: {
  //       subscriptions: { $ne: [] },
  //     },
  //   },
  // ]);

  return publicPost;
};

const updatePull = async (
  userId: Types.ObjectId,
  post_id: number,
  pull_id: number
) => {
  const userObjectId = new mongoose.Types.ObjectId(userId);
  const postObjectId = new mongoose.Types.ObjectId(post_id);
  const pullObjectId = new mongoose.Types.ObjectId(pull_id);

  const getPull = await pull.findOne({
    _id: pullObjectId,
    post_id: postObjectId,
  });
  if (!getPull) {
    throw new ApiError(404, "pull not found");
  }

  await pull.updateMany(
    { post_id: postObjectId },
    { $pull: { users: userObjectId } }
  );

  const result = await pull.findOneAndUpdate(
    { _id: pullObjectId, post_id: postObjectId },
    { $addToSet: { users: userObjectId } },
    { new: true }
  );

  return result;
};
export const PostServices = {
  createPost,
  getFeedAllPost,
  updatePull,
};
