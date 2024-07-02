"use strict";

import { ResponseBody } from "../../lib";

import { USER_MODEL } from "../models";

const signIn = async (request, response, next) => {
  const { body } = request;
  const result = await USER_MODEL.signIn(body);
  const responseBody = new ResponseBody(200, "Success", result);
  response.body = responseBody;

  next();
};

const signUp = async (request, response, next) => {
  const { body } = request;
  const result = await USER_MODEL.signUp(body);
  const responseBody = new ResponseBody(200, "Success", result);
  response.body = responseBody;

  next();
};

export const userController = {
  signIn,
  signUp,
};
