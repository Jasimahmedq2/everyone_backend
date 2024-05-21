import express from "express";
import auth from "../../middleware/auth";
import { UserRoles } from "../../../enums/user.role";
import { ProfileController } from "./profile.controller";
import upload from "../../../utils/multer";
const router = express.Router();

router
  .route("/")
  .post(
    upload.single("file"),
    auth(UserRoles.USER),
    ProfileController.createProfile
  ).get(auth(UserRoles.USER), ProfileController.getProfile)

export const profileRouter = router;
