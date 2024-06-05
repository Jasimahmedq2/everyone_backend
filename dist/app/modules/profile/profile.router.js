"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.profileRouter = void 0;
const express_1 = __importDefault(require("express"));
const auth_1 = __importDefault(require("../../middleware/auth"));
const user_role_1 = require("../../../enums/user.role");
const profile_controller_1 = require("./profile.controller");
const multer_1 = __importDefault(require("../../../utils/multer"));
const router = express_1.default.Router();
router
    .route("/")
    .post(multer_1.default.single("file"), (0, auth_1.default)(user_role_1.UserRoles.USER), profile_controller_1.ProfileController.createProfile)
    .get((0, auth_1.default)(user_role_1.UserRoles.USER), profile_controller_1.ProfileController.getProfile);
exports.profileRouter = router;
