import { Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import { ProfileService } from "../profile/profile.service";
import { SubscribeService } from "./subscript.service";

const subscribeToChannel = catchAsync(async (req: Request, res: Response) => {
  const { userId } = (req as any).user;
  const { id } = req.params;

  await SubscribeService.subscribeToChannel(id, userId);
  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: `subscribe to the channel ${id}`,
  });
});

const unsubscribeFromChannel = catchAsync(
  async (req: Request, res: Response) => {
    const { userId } = (req as any).user;
    const { id } = req.params;

    await SubscribeService.unsubscribeFromChannel(id, userId);
    sendResponse(res, {
      statusCode: 201,
      success: true,
      message: `unsubscribed the channel ${id}`,
    });
  }
);

export const SubscribeController = {
  subscribeToChannel,
  unsubscribeFromChannel,
};
