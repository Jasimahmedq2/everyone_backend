"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const multer_1 = __importDefault(require("multer"));
const multer_s3_1 = __importDefault(require("multer-s3"));
const s3client_1 = __importDefault(require("./s3client"));
const config_1 = __importDefault(require("../config"));
const upload = (0, multer_1.default)({
    storage: (0, multer_s3_1.default)({
        s3: s3client_1.default,
        bucket: config_1.default.aws.bucket_name,
        acl: "public-read", // or 'private' if needed
        metadata: function (req, file, cb) {
            cb(null, { fieldName: file.fieldname });
        },
        key: function (req, file, cb) {
            cb(null, Date.now().toString() + "-" + file.originalname);
        },
    }),
});
exports.default = upload;
