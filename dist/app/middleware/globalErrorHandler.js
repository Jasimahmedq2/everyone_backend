"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const handleValidationError_1 = __importDefault(require("../../errors/handleValidationError"));
const apiError_1 = __importDefault(require("../../errors/apiError"));
const globalMiddleware = (error, req, res, next) => {
    let statusCode = 400;
    let message = "something went wrong";
    let errorMessage = [];
    if (error.name === "ValidationError") {
        const manageError = (0, handleValidationError_1.default)(error);
        statusCode = manageError.statusCode;
        message = manageError.message;
        errorMessage = manageError.errorMessage;
    }
    else if (error.code && error.code === 11000) {
        statusCode = 409;
        message = "Duplicate key error";
        const key = Object.keys(error.keyValue)[0];
        const value = error.keyValue[key];
        errorMessage = [
            {
                path: key,
                message: `The value '${value}' for '${key}' already exists.`,
            },
        ];
    }
    else if (error instanceof apiError_1.default) {
        statusCode = error.statusCode;
        message = error.message;
        errorMessage = error.message
            ? [
                {
                    path: "",
                    message: error.message,
                },
            ]
            : [];
    }
    else if (error instanceof Error) {
        message = error.message;
        errorMessage = error.message
            ? [
                {
                    path: "",
                    message: error.message,
                },
            ]
            : [];
    }
    res.status(statusCode).json({
        success: false,
        statusCode: statusCode,
        message: message,
        errorMessage: errorMessage,
    });
    next();
};
exports.default = globalMiddleware;
