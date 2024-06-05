import mongoose from "mongoose";
import { profile } from "./profile.model";
import { IProfile } from "./profile.interface";
import ApiError from "../../../errors/apiError";
import { User } from "../auth/auth.models";
import bcrypt from "bcrypt";
import config from "../../../config";

const isWithin7Days = (date1: Date, date2: Date) => {
  const diffTime = Math.abs(Number(date2) - Number(date1));
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDays <= 7;
};

const createProfile = async (
  userId: number,
  location: string,
  payload: Partial<IProfile>
) => {
  const { name, password, new_password } = payload;
  if (location) {
    payload.image = location;
  }

  const getProfile = await profile.findOne({
    user: userId,
  });

  const checkUser = await User.findOne({
    _id: userId,
  });

  // change password

  if (password && new_password) {
    const isPasswordMatched = await bcrypt.compare(
      password!,
      checkUser!.password
    );

    const hashedPass = await bcrypt.hash(
      new_password,
      Number(config.bcrypt_salt_rounds)
    );

    if (isPasswordMatched) {
      await User.findOneAndUpdate(
        { _id: userId },
        { password: hashedPass },
        { new: true }
      );
    }
  }

  if (name) {
    await User.findOneAndUpdate({ _id: userId }, { name: name }, { new: true });
  }

  if (getProfile) {
    if (payload.user_name) {
      if (
        getProfile.user_name_updated &&
        isWithin7Days(new Date(getProfile.user_name_updated), new Date())
      ) {
        throw new Error("You can only update your username once every 7 days.");
      }
      getProfile.user_name = payload?.user_name;
      getProfile.user_name_updated = new Date();
    }
    if (payload.image) {
      getProfile.image = payload.image;
    }
    if (payload.bio) {
      getProfile.bio = payload?.bio;
    }
    if (payload.birthday) {
      getProfile.birthday = payload.birthday;
    }
    await getProfile.save();
  } else {
    const createProfile = new profile({
      user: userId,
      user_name: payload?.user_name,
      user_name_updated: payload?.user_name ? new Date() : null,
      image: payload.image,
      bio: payload?.bio,
      birthday: payload.birthday,
    });
    await createProfile.save();
  }
};

const getProfile = async (userId: number): Promise<IProfile> => {
  const result = await profile.findOne({ user: userId }).populate("user")
  if (!result) {
    throw new ApiError(404, "profile not found");
  }
  return result;
};

export const ProfileService = {
  createProfile,
  getProfile,
};
