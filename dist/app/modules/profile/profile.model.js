"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.profile = void 0;
const mongoose_1 = require("mongoose");
const profileSchema = new mongoose_1.Schema({
    user: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "user",
    },
    image: {
        type: String,
        default: "",
    },
    bio: {
        type: String,
        default: "",
    },
    user_name: {
        type: String,
        unique: true,
    },
    birthday: {
        type: Date,
    },
    gender: {
        type: String,
    },
    user_name_updated: {
        type: Date,
    },
}, { timestamps: true });
profileSchema.pre("save", function (next) {
    if (this.isModified("user_name")) {
        this.user_name_updated = new Date();
    }
    next();
});
exports.profile = (0, mongoose_1.model)("profile", profileSchema);
