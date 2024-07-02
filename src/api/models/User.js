"use strict";

import { MONGO_MODEL } from "./MongoDB";

import bcrypt from "bcryptjs";

import { JWTMethods } from "../../lib";

const { createToken } = JWTMethods;

const signIn = async (body) => {
  const { userName, password } = body;

  const result = await MONGO_MODEL.mongoFindOne(
    "user",
    { userName },
    { password: 1, role: 1 }
  );

  if (!result) {
    return { status: false, message: "Wrong Credentials" };
  }

  const { password: hashedPassword } = result;

  const passwordMatched = await bcrypt.compare(password, hashedPassword);

  if (!passwordMatched) {
    return { status: false, message: "Wrong Credentials" };
  }

  const { role } = result;

  return { status: true, token: createToken({ role }) };
};

const signUp = async (body) => {
  const { userName, password, role } = body;

  const foundRecord = await MONGO_MODEL.mongoFindOne("user", { userName });

  if (foundRecord) {
    return { status: false, message: "UserName already Exists" };
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const result = await MONGO_MODEL.mongoInsertOne("user", {
    ...body,
    password: hashedPassword,
  });

  if (result.acknowledged) {
    return { status: true, token: createToken({ role }) };
  } else {
    return { status: false, message: "something went wrong" };
  }
};

export const USER_MODEL = {
  signIn,
  signUp,
};
