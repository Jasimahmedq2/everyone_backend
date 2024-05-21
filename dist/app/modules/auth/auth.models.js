"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const mongoose_1 = require("mongoose");
const auth_constant_1 = require("./auth.constant");
const UserModel = new mongoose_1.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    name: {
        type: String,
    },
    role: {
        enum: auth_constant_1.UserRoleConstant,
        type: String,
        default: "user",
    },
    is_verified: {
        type: Boolean,
        default: false,
    },
    phone_no: {
        type: String,
        required: true,
    },
    login_with: {
        type: String,
        default: "",
    },
}, { timestamps: true });
exports.User = (0, mongoose_1.model)("user", UserModel);
