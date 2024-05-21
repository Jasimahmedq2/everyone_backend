"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.pull = void 0;
const mongoose_1 = require("mongoose");
const PullSchema = new mongoose_1.Schema({
    post_id: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "post",
    },
    text: {
        type: String,
        require: true,
    },
    users: [{ type: mongoose_1.Schema.Types.ObjectId, ref: "user" }],
});
exports.pull = (0, mongoose_1.model)("pull", PullSchema);
