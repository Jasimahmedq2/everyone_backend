import express from "express";
import { FollowControllers } from "./follow.controller";
import { UserRoles } from "../../../enums/user.role";
import auth from "../../middleware/auth";
const router = express.Router();

router.route("/follow").post(auth("user"), FollowControllers.followUser);
// unfollow user
router.route("/unfollow").post(auth("user"), FollowControllers.unFollowUser);
// follower list
router.route("/followers").get(auth("user"), FollowControllers.getAllFollowers);

// get all following user
router
  .route("/followings")
  .get(auth("user"), FollowControllers.getAllFollowing);

router
  .route("/isFollow/:id")
  .get(auth(UserRoles.USER), FollowControllers.isFollowed);

export const FollowRoutes = router;
