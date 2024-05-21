import express from "express";
import { FollowRoutes } from "../modules/follow/follow.routes";
import { postRoutes } from "../modules/post/post.routes";
import { profileRouter } from "../modules/profile/profile.router";
import { AuthRoutes } from "../modules/auth/auth.route";

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
];

CoreRoutes.forEach((route) => router.use(route.path, route.element));

export default router;
