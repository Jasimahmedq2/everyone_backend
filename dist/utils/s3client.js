"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const client_s3_1 = require("@aws-sdk/client-s3");
const config_1 = __importDefault(require("../config"));
const s3Client = new client_s3_1.S3Client({
    region: config_1.default.aws.bucket_origin,
    credentials: {
        accessKeyId: config_1.default.aws.access_key,
        secretAccessKey: config_1.default.aws.secret_key,
    },
});
exports.default = s3Client;
