"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostController = void 0;
const catchAsync_1 = __importDefault(require("../../../shared/catchAsync"));
const sendResponse_1 = __importDefault(require("../../../shared/sendResponse"));
const post_service_1 = require("./post.service");
const createPost = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const { userId } = req.user;
    const location = (_a = req === null || req === void 0 ? void 0 : req.file) === null || _a === void 0 ? void 0 : _a.location;
    const result = yield post_service_1.PostServices.createPost(userId, location, req.body);
    (0, sendResponse_1.default)(res, {
        statusCode: 201,
        success: true,
        message: "the post created",
    });
}));
const getFeedAllPost = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId } = req.user;
    const result = yield post_service_1.PostServices.getFeedAllPost(userId);
    console.log({ length: result === null || result === void 0 ? void 0 : result.length });
    (0, sendResponse_1.default)(res, {
        statusCode: 201,
        success: true,
        data: result,
        message: "feed posts",
    });
}));
const updatePull = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId } = req.user;
    const { pull_id, post_id } = req.query;
    const result = yield post_service_1.PostServices.updatePull(userId, post_id, pull_id);
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        success: true,
        data: result,
        message: "update pull",
    });
}));
exports.PostController = {
    createPost,
    getFeedAllPost,
    updatePull,
};
