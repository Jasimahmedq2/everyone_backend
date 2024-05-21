"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const follow_routes_1 = require("../modules/follow/follow.routes");
const post_routes_1 = require("../modules/post/post.routes");
const profile_router_1 = require("../modules/profile/profile.router");
const auth_route_1 = require("../modules/auth/auth.route");
const router = express_1.default.Router();
const CoreRoutes = [
    {
        path: "/auth",
        element: auth_route_1.AuthRoutes,
    },
    {
        path: "/post",
        element: post_routes_1.postRoutes,
    },
    {
        path: "/following",
        element: follow_routes_1.FollowRoutes,
    },
    {
        path: "/profile",
        element: profile_router_1.profileRouter,
    },
];
CoreRoutes.forEach((route) => router.use(route.path, route.element));
exports.default = router;
