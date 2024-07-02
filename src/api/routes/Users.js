"use strict";

import Express from "express";

import { watchTower } from "../helpers";

import { SendResponse } from "../../lib/SendResponse";
import { userController } from "../controllers";

const { sendResponse } = SendResponse;

const UserRouter = new Express.Router();

UserRouter.post("/signIn", watchTower(userController.signIn));

UserRouter.post("/signUp", watchTower(userController.signUp));

UserRouter.use(sendResponse);

export { UserRouter };
