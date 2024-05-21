"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FollowRoutes = void 0;
const express_1 = __importDefault(require("express"));
const follow_controller_1 = require("./follow.controller");
const user_role_1 = require("../../../enums/user.role");
const auth_1 = __importDefault(require("../../middleware/auth"));
const router = express_1.default.Router();
router.route("/follow").post((0, auth_1.default)("user"), follow_controller_1.FollowControllers.followUser);
// unfollow user
router.route("/unfollow").post((0, auth_1.default)("user"), follow_controller_1.FollowControllers.unFollowUser);
// follower list
router.route("/followers").get((0, auth_1.default)("user"), follow_controller_1.FollowControllers.getAllFollowers);
// get all following user
router
    .route("/followings")
    .get((0, auth_1.default)("user"), follow_controller_1.FollowControllers.getAllFollowing);
router
    .route("/isFollow/:id")
    .get((0, auth_1.default)(user_role_1.UserRoles.USER), follow_controller_1.FollowControllers.isFollowed);
exports.FollowRoutes = router;
