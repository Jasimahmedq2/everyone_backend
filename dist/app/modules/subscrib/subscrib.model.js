"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Subscribe = void 0;
const mongoose_1 = require("mongoose");
const SubscribSchema = new mongoose_1.Schema({
    post_id: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "post",
    },
    subscrib_id: {
        type: String,
    },
    amount_required: {
        type: Number,
        default: 0,
    },
    subscribed_user: [{ type: mongoose_1.Schema.Types.ObjectId, ref: "user" }],
    paid_users: [{ type: mongoose_1.Schema.Types.ObjectId, ref: "user" }],
}, { timestamps: true });
SubscribSchema.pre("save", function (next) {
    const randomNumber = Math.floor(Math.random() * 1000000);
    const uniqueSuffix = Date.now();
    this.subscrib_id = `everyone-${randomNumber}-${uniqueSuffix}`;
    next();
});
exports.Subscribe = (0, mongoose_1.model)("subscrib", SubscribSchema);
