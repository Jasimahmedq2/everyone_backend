import ApiError from "../../../errors/apiError";
import { Comment } from "./comment.model";
import { Types } from "mongoose";

const createComment = async (
  postId: string,
  userId: string,
  text: string,
  file: string
) => {
  const newComment = new Comment({
    post_id: new Types.ObjectId(postId),
    user_id: new Types.ObjectId(userId),
    text,
    files: [file],
  });

  await newComment.save();
  return newComment;
};

// sub comment

const createSubComment = async (
  commentId: string,
  postId: string,
  userId: string,
  text: string,
  file: string
) => {
  const parentComment = await Comment.findById(commentId);
  if (!parentComment) {
    throw new ApiError(404, "Parent comment not found");
  }

  const newSubComment = new Comment({
    post_id: new Types.ObjectId(postId),
    user_id: new Types.ObjectId(userId),
    text,
    file,
  });

  await newSubComment.save();

  parentComment?.sub_comments?.push(newSubComment._id);
  await parentComment.save();

  return newSubComment;
};

// delete comment

const deleteComment = async (commentId: string, userId: string) => {
  const comment = await Comment.findById(commentId);
  if (!comment) {
    throw new ApiError(404, "Comment not found");
  }

  if (comment.user_id.toString() !== userId) {
    throw new ApiError(403, "User not authorized to delete this comment");
  }

  await Comment.findByIdAndDelete(commentId);
  return comment;
};

// update comment

const updateComment = async (
  commentId: string,
  userId: string,
  text: string,
  file: string
) => {
  const comment = await Comment.findById(commentId);
  if (!comment) {
    throw new ApiError(404, "Comment not found");
  }

  if (comment.user_id.toString() !== userId) {
    throw new ApiError(403, "User not authorized to update this comment");
  }

  if (text) {
    comment.text = text;
  }
  if (file) {
    comment.files?.push(file);
  }
  await comment.save();

  return comment;
};

// like on comment

const likeOnComment = async (commentId: string, userId: string) => {
  const comment = await Comment.findById(commentId);
  if (!comment) {
    throw new ApiError(404, "Comment not found");
  }

  const userObjectId = new Types.ObjectId(userId);
  if (comment?.likes?.includes(userObjectId)) {
    throw new ApiError(400, "User already liked this comment");
  }

  comment?.likes?.push(userObjectId);
  await comment.save();

  return comment;
};

export const CommentLikeServices = {
  createComment,
  deleteComment,
  updateComment,
  likeOnComment,
  createSubComment,
};
