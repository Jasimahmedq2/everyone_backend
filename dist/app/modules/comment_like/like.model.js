"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Like = void 0;
const mongoose_1 = require("mongoose");
const LikeSchema = new mongoose_1.Schema({
    post_id: { type: mongoose_1.Schema.Types.ObjectId, ref: "post", required: true },
    user_id: { type: mongoose_1.Schema.Types.ObjectId, ref: "user", required: true },
});
exports.Like = (0, mongoose_1.model)("like", LikeSchema);
