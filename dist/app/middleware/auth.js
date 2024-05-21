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
const jwtHelpers_1 = require("../../shared/jwtHelpers");
const apiError_1 = __importDefault(require("../../errors/apiError"));
const config_1 = __importDefault(require("../../config"));
const auth = (...Roles) => (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const token = req.headers.authorization;
        let verifiedToken = null;
        verifiedToken = jwtHelpers_1.JwtHelpers.verifyToken(token, config_1.default.jwt.access_secret);
        if (!verifiedToken) {
            throw new apiError_1.default(400, "token invalid");
        }
        req.user = verifiedToken;
        if (Roles.length && !Roles.includes(verifiedToken.role)) {
            throw new apiError_1.default(401, "unauthorized user");
        }
        next();
    }
    catch (error) {
        next(error);
    }
});
exports.default = auth;
