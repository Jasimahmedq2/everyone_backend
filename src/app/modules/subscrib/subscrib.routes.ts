import { Router } from "express";
import auth from "../../middleware/auth";
import { UserRoles } from "../../../enums/user.role";
import { SubscribeController } from "./subscript.controller";

const router = Router();

router
  .route("/add/:id")
  .post(auth(UserRoles.USER), SubscribeController.subscribeToChannel);

// unsubscribe
router
  .route("/remove/:id")
  .post(auth(UserRoles.USER), SubscribeController.unsubscribeFromChannel);

export const subscribeRouter = router;
