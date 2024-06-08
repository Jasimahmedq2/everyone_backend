import { Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import { CommentLikeServices } from "./comment_like.service";

const createComment = catchAsync(async (req: Request, res: Response) => {
  const { userId } = (req as any).user;
  const { post_id } = (req as any).params;
  const location = (req as any)?.file?.location;
  console.log({ location, body: req.body });
  const result = await CommentLikeServices.createComment(
    post_id,
    userId,
    req?.body?.text,
    location
  );

  sendResponse(res, {
    statusCode: 201,
    success: true,
    data: result,
    message: `A new comment created for this post ${post_id}`,
  });
});

// create sub comment
const createSubComment = catchAsync(async (req: Request, res: Response) => {
  const { userId } = (req as any).user;
  const { id } = (req as any).params;
  const location = (req as any)?.file?.location;
  const body = req.body;
  const text = body?.text;
  const post_id = body?.post_id;
  const result = await CommentLikeServices.createSubComment(
    id,
    post_id,
    userId,
    text,
    location
  );

  sendResponse(res, {
    statusCode: 201,
    success: true,
    data: result,
    message: `A new sub comment has been created for this post ${post_id}`,
  });
});

// delete a comment
const deleteComment = catchAsync(async (req: Request, res: Response) => {
  const { userId } = (req as any).user;
  const { id } = (req as any).params;

  const result = await CommentLikeServices.deleteComment(id, userId);

  sendResponse(res, {
    statusCode: 201,
    success: true,
    data: result,
    message: `A  comment has been deleted ${id}`,
  });
});

// update a comment
const updateComment = catchAsync(async (req: Request, res: Response) => {
  const { userId } = (req as any).user;
  const { id } = (req as any).params;
  const location = (req as any)?.file?.location;

  const result = await CommentLikeServices.updateComment(
    id,
    userId,
    req?.body?.text,
    location
  );

  sendResponse(res, {
    statusCode: 201,
    success: true,
    data: result,
    message: `A  comment has been updated ${id}`,
  });
});
// like on comment
const likeOnComment = catchAsync(async (req: Request, res: Response) => {
  const { userId } = (req as any).user;
  const { id } = (req as any).params;

  const result = await CommentLikeServices.likeOnComment(id, userId);

  sendResponse(res, {
    statusCode: 201,
    success: true,
    data: result,
    message: `a new like added on the comment ${id}`,
  });
});

export const CommentLikeController = {
  createComment,
  deleteComment,
  updateComment,
  likeOnComment,
  createSubComment,
};
