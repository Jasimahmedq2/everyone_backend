import express from "express";
import { PostController } from "./post.controller";
import upload from "../../../utils/multer";
import auth from "../../middleware/auth";
import { UserRoles } from "../../../enums/user.role";

const router = express.Router();

router
  .route("/")
  .post(auth("user"), upload.single("file"), PostController.createPost)
  .get(auth(UserRoles.USER), PostController.getFeedAllPost);

router
  .route("/pull")
  .patch(auth(UserRoles.USER), PostController.updatePull);

export const postRoutes = router;
