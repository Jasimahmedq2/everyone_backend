"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Comment = void 0;
const mongoose_1 = require("mongoose");
const CommentSchema = new mongoose_1.Schema({
    post_id: { type: mongoose_1.Schema.Types.ObjectId, ref: "post", required: true },
    user_id: { type: mongoose_1.Schema.Types.ObjectId, ref: "user", required: true },
    text: { type: String, default: "" },
    file: { type: String, default: "" },
}, { timestamps: true });
exports.Comment = (0, mongoose_1.model)("comment", CommentSchema);
