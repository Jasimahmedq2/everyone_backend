import { Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import { ProfileService } from "./profile.service";

const createProfile = catchAsync(async (req: Request, res: Response) => {
  const { userId } = (req as any).user;
  const location = (req as any)?.file?.location;
  await ProfileService.createProfile(userId, location, req.body);
  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: "the profile modified",
  });
});

// get profile
const getProfile = catchAsync(async (req: Request, res: Response) => {
  const { userId } = (req as any).user;
  const result = await ProfileService.getProfile(userId);
  sendResponse(res, {
    statusCode: 200,
    data: result,
    success: true,
    message: "get profile",
  });
});

export const ProfileController = {
  createProfile,
  getProfile,
};
