import express from "express";
import { FollowRoutes } from "../modules/follow/follow.routes";
import { postRoutes } from "../modules/post/post.routes";
import { profileRouter } from "../modules/profile/profile.router";
import { AuthRoutes } from "../modules/auth/auth.route";
import { subscribeRouter } from "../modules/subscrib/subscrib.routes";
import { commentRouter } from "../modules/comment_like/comment_like.router";

const router = express.Router();

const CoreRoutes = [
  {
    path: "/auth",
    element: AuthRoutes,
  },
  {
    path: "/post",
    element: postRoutes,
  },
  {
    path: "/following",
    element: FollowRoutes,
  },
  {
    path: "/profile",
    element: profileRouter,
  },
  {
    path: "/subscribe",
    element: subscribeRouter,
  },
  {
    path: "/like-comment",
    element: commentRouter,
  },
];

CoreRoutes.forEach((route) => router.use(route.path, route.element));

export default router;
