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
exports.FollowServices = void 0;
const apiError_1 = __importDefault(require("../../../errors/apiError"));
const follow_model_1 = require("./follow.model");
const followUser = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const { follower, followed } = payload;
    if (follower.toString() === followed.toString()) {
        throw new Error("A user cannot follow themselves.");
    }
    const existingFollow = yield follow_model_1.Follow.findOne({ follower, followed });
    if (existingFollow) {
        throw new apiError_1.default(403, "Already following this user");
    }
    const follow = new follow_model_1.Follow({ follower, followed });
    yield follow.save();
});
const unFollowUser = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const { follower, followed } = payload;
    const existingFollow = yield follow_model_1.Follow.findOne({ follower, followed });
    if (!existingFollow) {
        throw new apiError_1.default(404, "following relationship not found");
    }
    const follow = yield follow_model_1.Follow.findOneAndDelete({ follower, followed });
    return follow;
});
// get all follower
const getAllFollowers = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const follows = yield follow_model_1.Follow.find({ followed: userId }).populate({
        path: "follower",
        select: "_id name image",
    });
    return follows;
});
// get all following
const getAllFollowing = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const follows = yield follow_model_1.Follow.find({ follower: userId }).populate({
        path: "followed",
        select: "_id name image",
    });
    return follows;
});
// isFollowed
const isFollowed = (userId, followed) => __awaiter(void 0, void 0, void 0, function* () {
    const following = yield follow_model_1.Follow.findOne({
        follower: userId,
        followed: followed,
    });
    const followedData = yield follow_model_1.Follow.findOne({
        follower: followed,
        followed: userId,
    });
    console.log({ following, followedData, userId, followed });
    let followStatus;
    if (following) {
        followStatus = "following";
    }
    else if (followedData) {
        followStatus = "followed";
    }
    else {
        followStatus = "follow";
    }
    return followStatus;
});
exports.FollowServices = {
    followUser,
    unFollowUser,
    getAllFollowers,
    getAllFollowing,
    isFollowed,
};
