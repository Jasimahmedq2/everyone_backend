import { Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import { FollowServices } from "./follow.service";
import { Types } from "mongoose";

const followUser = catchAsync(async (req: Request, res: Response) => {
  const { id } = (req as any).query;

  console.log({ id });
  const { userId } = (req as any).user;
  console.log({ id, userId });
  // user id is follwer & id is followed
  const result = await FollowServices.followUser({
    follower: userId,
    followed: id,
  });
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "followed",
    data: result,
  });
});

const unFollowUser = catchAsync(async (req: Request, res: Response) => {
  const { id } = (req as any).query;
  const { userId } = (req as any).user;

  const result = await FollowServices.unFollowUser({
    follower: userId,
    followed: id,
  });
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "unfollowed",
    data: result,
  });
});
// get all followers
const getAllFollowers = catchAsync(async (req: Request, res: Response) => {
  const { userId } = (req as any).user;

  const result = await FollowServices.getAllFollowers(userId);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "followers",
    data: result,
  });
});

const getAllFollowing = catchAsync(async (req: Request, res: Response) => {
  const { userId } = (req as any).user;

  const result = await FollowServices.getAllFollowing(userId);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "following user",
    data: result,
  });
});
// is followed
const isFollowed = catchAsync(async (req: Request, res: Response) => {
  const { id: followed } = (req as any).params;
  const { userId } = (req as any).user;

  const result = await FollowServices.isFollowed(userId, followed);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "is followed user",
    data: result,
  });
});

export const FollowControllers = {
  followUser,
  unFollowUser,
  getAllFollowers,
  getAllFollowing,
  isFollowed,
};
