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
exports.PostServices = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const subscrib_model_1 = require("../subscrib/subscrib.model");
const post_model_1 = require("./post.model");
const pull_model_1 = require("./pull.model");
const apiError_1 = __importDefault(require("../../../errors/apiError"));
const createPost = (userId, location, payload) => __awaiter(void 0, void 0, void 0, function* () {
    console.log({ payload });
    const session = yield mongoose_1.default.startSession();
    session.startTransaction();
    try {
        const post = new post_model_1.Post({
            user_id: userId,
            text: payload === null || payload === void 0 ? void 0 : payload.text,
            files: [location],
            post_type: payload === null || payload === void 0 ? void 0 : payload.post_type,
            access_post: payload === null || payload === void 0 ? void 0 : payload.access_post,
        });
        const result = yield post.save();
        // subscribe
        const subscribe = yield subscrib_model_1.Subscribe.create({ post_id: result === null || result === void 0 ? void 0 : result._id });
        // create pull
        if (payload.post_type === "pull" && (payload === null || payload === void 0 ? void 0 : payload.pull)) {
            for (let i = 0; i < payload.pull.length; i++) {
                const elm = payload.pull[i];
                const createPull = yield pull_model_1.pull.create({
                    post_id: result === null || result === void 0 ? void 0 : result._id,
                    text: elm,
                });
            }
        }
        yield session.commitTransaction();
    }
    catch (error) {
        yield session.abortTransaction();
    }
});
const getFeedAllPost = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const publicPost = yield post_model_1.Post.aggregate([
        {
            $match: {
                post_type: { $in: ["pull", "common"] },
            },
        },
        {
            $lookup: {
                from: "pulls",
                localField: "_id",
                foreignField: "post_id",
                as: "pull",
            },
        },
        {
            $lookup: {
                from: "users",
                localField: "user_id",
                foreignField: "_id",
                as: "user",
            },
        },
        {
            $project: {
                "user.password": 0,
            },
        },
    ]);
    // get private posts
    // const privatePost = await Post.aggregate([
    //   {
    //     $match: {
    //       post_type: { $in: ["pull", "common"] },
    //       access_post: "private",
    //     },
    //   },
    //   {
    //     $lookup: {
    //       from: "pulls",
    //       localField: "_id",
    //       foreignField: "post_id",
    //       as: "pull",
    //     },
    //   },
    //   {
    //     $lookup: {
    //       from: "users",
    //       localField: "_id",
    //       foreignField: "user_id",
    //       as: "users",
    //     },
    //   },
    // ]);
    // const postsWithPullsAndSubscriptions = await Post.aggregate([
    //   {
    //     $match: {
    //       post_type: { $in: ["pull", "common"] },
    //       access_post: "private",
    //     },
    //   },
    //   {
    //     $lookup: {
    //       from: "pulls",
    //       localField: "_id",
    //       foreignField: "post_id",
    //       as: "pulls",
    //     },
    //   },
    //   {
    //     $lookup: {
    //       from: "subscribes",
    //       localField: "_id",
    //       foreignField: "post_id",
    //       as: "subscriptions",
    //     },
    //   },
    //   {
    //     $addFields: {
    //       subscriptions: {
    //         $filter: {
    //           input: "$subscriptions",
    //           as: "subscription",
    //           cond: { $in: [userId, "$$subscription.paid_users"] },
    //         },
    //       },
    //     },
    //   },
    //   {
    //     $match: {
    //       subscriptions: { $ne: [] },
    //     },
    //   },
    // ]);
    return publicPost;
});
const updatePull = (userId, post_id, pull_id) => __awaiter(void 0, void 0, void 0, function* () {
    const getPull = yield pull_model_1.pull.findOne({ _id: pull_id, post_id: post_id });
    if (!getPull) {
        throw new apiError_1.default(404, "pull not found");
    }
    const result = yield pull_model_1.pull.findOneAndUpdate({ _id: pull_id, post_id: post_id }, { $addToSet: { users: userId } }, { new: true });
    return result;
});
exports.PostServices = {
    createPost,
    getFeedAllPost,
    updatePull,
};
