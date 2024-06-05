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
exports.ProfileService = void 0;
const profile_model_1 = require("./profile.model");
const apiError_1 = __importDefault(require("../../../errors/apiError"));
const auth_models_1 = require("../auth/auth.models");
const bcrypt_1 = __importDefault(require("bcrypt"));
const config_1 = __importDefault(require("../../../config"));
const isWithin7Days = (date1, date2) => {
    const diffTime = Math.abs(Number(date2) - Number(date1));
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays <= 7;
};
const createProfile = (userId, location, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, password, new_password } = payload;
    if (location) {
        payload.image = location;
    }
    const getProfile = yield profile_model_1.profile.findOne({
        user: userId,
    });
    const checkUser = yield auth_models_1.User.findOne({
        _id: userId,
    });
    // change password
    if (password && new_password) {
        const isPasswordMatched = yield bcrypt_1.default.compare(password, checkUser.password);
        const hashedPass = yield bcrypt_1.default.hash(new_password, Number(config_1.default.bcrypt_salt_rounds));
        if (isPasswordMatched) {
            yield auth_models_1.User.findOneAndUpdate({ _id: userId }, { password: hashedPass }, { new: true });
        }
    }
    if (name) {
        yield auth_models_1.User.findOneAndUpdate({ _id: userId }, { name: name }, { new: true });
    }
    if (getProfile) {
        if (payload.user_name) {
            if (getProfile.user_name_updated &&
                isWithin7Days(new Date(getProfile.user_name_updated), new Date())) {
                throw new Error("You can only update your username once every 7 days.");
            }
            getProfile.user_name = payload === null || payload === void 0 ? void 0 : payload.user_name;
            getProfile.user_name_updated = new Date();
        }
        if (payload.image) {
            getProfile.image = payload.image;
        }
        if (payload.bio) {
            getProfile.bio = payload === null || payload === void 0 ? void 0 : payload.bio;
        }
        if (payload.birthday) {
            getProfile.birthday = payload.birthday;
        }
        yield getProfile.save();
    }
    else {
        const createProfile = new profile_model_1.profile({
            user: userId,
            user_name: payload === null || payload === void 0 ? void 0 : payload.user_name,
            user_name_updated: (payload === null || payload === void 0 ? void 0 : payload.user_name) ? new Date() : null,
            image: payload.image,
            bio: payload === null || payload === void 0 ? void 0 : payload.bio,
            birthday: payload.birthday,
        });
        yield createProfile.save();
    }
});
const getProfile = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield profile_model_1.profile.findOne({ user: userId }).populate("user");
    if (!result) {
        throw new apiError_1.default(404, "profile not found");
    }
    return result;
});
exports.ProfileService = {
    createProfile,
    getProfile,
};
