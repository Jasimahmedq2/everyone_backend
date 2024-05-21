"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FollowControllers = void 0;
const catchAsync_1 = __importDefault(require("../../../shared/catchAsync"));
const sendResponse_1 = __importDefault(require("../../../shared/sendResponse"));
const follow_service_1 = require("./follow.service");
const followUser = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.query;
    console.log({ id });
    const { userId } = req.user;
    console.log({ id, userId });
    // user id is follwer & id is followed
    const result = yield follow_service_1.FollowServices.followUser({
        follower: userId,
        followed: id,
    });
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        success: true,
        message: "followed",
        data: result,
    });
}));
const unFollowUser = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.query;
    const { userId } = req.user;
    const result = yield follow_service_1.FollowServices.unFollowUser({
        follower: userId,
        followed: id,
    });
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        success: true,
        message: "unfollowed",
        data: result,
    });
}));
// get all followers
const getAllFollowers = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId } = req.user;
    const result = yield follow_service_1.FollowServices.getAllFollowers(userId);
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        success: true,
        message: "followers",
        data: result,
    });
}));
const getAllFollowing = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId } = req.user;
    const result = yield follow_service_1.FollowServices.getAllFollowing(userId);
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        success: true,
        message: "following user",
        data: result,
    });
}));
// is followed
const isFollowed = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id: followed } = req.params;
    const { userId } = req.user;
    const result = yield follow_service_1.FollowServices.isFollowed(userId, followed);
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        success: true,
        message: "is followed user",
        data: result,
    });
}));
exports.FollowControllers = {
    followUser,
    unFollowUser,
    getAllFollowers,
    getAllFollowing,
    isFollowed,
};
