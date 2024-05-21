"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Follow = void 0;
const mongoose_1 = require("mongoose");
const followSchema = new mongoose_1.Schema({
    follower: { type: mongoose_1.Schema.Types.ObjectId, ref: "user", required: true },
    followed: { type: mongoose_1.Schema.Types.ObjectId, ref: "user", required: true },
}, { timestamps: true });
exports.Follow = (0, mongoose_1.model)("follow", followSchema);
