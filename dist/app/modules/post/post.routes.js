"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.postRoutes = void 0;
const express_1 = __importDefault(require("express"));
const post_controller_1 = require("./post.controller");
const multer_1 = __importDefault(require("../../../utils/multer"));
const auth_1 = __importDefault(require("../../middleware/auth"));
const user_role_1 = require("../../../enums/user.role");
const router = express_1.default.Router();
router
    .route("/")
    .post((0, auth_1.default)("user"), multer_1.default.single("file"), post_controller_1.PostController.createPost)
    .get((0, auth_1.default)(user_role_1.UserRoles.USER), post_controller_1.PostController.getFeedAllPost);
router.route("/pull").post((0, auth_1.default)(user_role_1.UserRoles.USER), post_controller_1.PostController.updatePull);
exports.postRoutes = router;
