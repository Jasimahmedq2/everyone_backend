"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Post = void 0;
const mongoose_1 = require("mongoose");
const post_constant_1 = require("./post.constant");
const PostSchema = new mongoose_1.Schema({
    user_id: { type: mongoose_1.Schema.Types.ObjectId, ref: "user", required: true },
    text: { type: String, required: true },
    files: [{ type: String }],
    access_post: {
        enum: post_constant_1.ACCESS_POST,
        type: String,
        default: "public",
    },
    post_type: {
        enum: post_constant_1.PostType,
        type: String,
        default: "common",
    },
}, { timestamps: true });
exports.Post = (0, mongoose_1.model)("post", PostSchema);
