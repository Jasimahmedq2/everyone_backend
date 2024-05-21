"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthValidationSchema = void 0;
const zod_1 = require("zod");
const auth_constant_1 = require("./auth.constant");
const CreateUser = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string({
            required_error: "name is required",
        }),
        email: zod_1.z.string({
            required_error: "email is required",
        }),
        role: zod_1.z.enum([...auth_constant_1.UserRoleConstant]).optional(),
        phone_no: zod_1.z.string({
            required_error: "phone number is required",
        })
    }),
});
const logInUser = zod_1.z.object({
    body: zod_1.z.object({
        email: zod_1.z.string({
            required_error: "email is required",
        }),
        password: zod_1.z.string({
            required_error: "password is required",
        }),
    }),
});
exports.AuthValidationSchema = {
    CreateUser,
    logInUser,
};
