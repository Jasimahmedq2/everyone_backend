import { Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import { PostServices } from "./post.service";

const createPost = catchAsync(async (req: Request, res: Response) => {
  const { userId } = (req as any).user;
  const location = (req as any)?.file?.location;
  const result = await PostServices.createPost(userId, location, req.body);
  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: "the post created",
  });
});

const getFeedAllPost = catchAsync(async (req: Request, res: Response) => {
  const { userId } = (req as any).user;
  const result = await PostServices.getFeedAllPost(userId);
  console.log({ length: result?.length });
  sendResponse(res, {
    statusCode: 201,
    success: true,
    data: result,
    message: "feed posts",
  });
});

const updatePull = catchAsync(async (req: Request, res: Response) => {
  const { userId } = (req as any).user;
  const { pull_id, post_id } = (req as any).query;
  const result = await PostServices.updatePull(userId, post_id, pull_id);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    data: result,
    message: "update pull",
  });
});

export const PostController = {
  createPost,
  getFeedAllPost,
  updatePull,
};
