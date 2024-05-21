import mongoose from "mongoose";
import { Subscribe } from "../subscrib/subscrib.model";
import { IPost } from "./post.interface";
import { Post } from "./post.model";
import { pull } from "./pull.model";
import ApiError from "../../../errors/apiError";

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
    const result = await post.save();
    // subscribe
    const subscribe = await Subscribe.create({ post_id: result?._id });
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
      $project: {
        "user.password": 0,
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

const updatePull = async (userId: number, post_id: number, pull_id: number) => {
  const getPull = await pull.findOne({ _id: pull_id, post_id: post_id });
  if (!getPull) {
    throw new ApiError(404, "pull not found");
  }

  const result = await pull.findOneAndUpdate(
    { _id: pull_id, post_id: post_id },
    { $addToSet: { users: userId } },
    { new: true }
  );
  return result;
};

export const PostServices = {
  createPost,
  getFeedAllPost,
  updatePull,
};
