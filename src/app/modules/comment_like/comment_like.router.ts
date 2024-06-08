import express from "express";
import upload from "../../../utils/multer";
import auth from "../../middleware/auth";
import { UserRoles } from "../../../enums/user.role";
import { CommentLikeController } from "./comment_like.controller";

const router = express.Router();

router
  .route("/:post_id")
  .post(
    upload.single("file"),
    auth(UserRoles.USER),
    CommentLikeController.createComment
  );

// add sub comment
router
  .route("/sub-comment/:id")
  .post(
    upload.single("file"),
    auth(UserRoles.USER),
    CommentLikeController.createSubComment
  );

// update & delete and like comment
router
  .route("/:id")
  .patch(
    upload.single("file"),
    auth(UserRoles.USER),
    CommentLikeController.updateComment
  )
  .delete(auth(UserRoles.USER), CommentLikeController.deleteComment);

router
  .route("/like/:id")
  .post(auth(UserRoles.USER), CommentLikeController.likeOnComment);

export const commentRouter = router;
