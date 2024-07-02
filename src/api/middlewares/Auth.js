"use strict";

import { JWTMethods } from "../../lib";

const adminValidateHeaders = async (request, response, next) => {
  const { headers } = request;

  const { authorization } = headers;

  const authToken = authorization && authorization.split("Bearer ")[1];

  try {
    const result = JWTMethods.verifyToken(authToken);

    const { role } = result;

    if (role === "admin") {
      return next();
    } else {
      response.status(401).json({ message: "Unauthorized Access" });
    }
  } catch (error) {
    response.status(200).json({ message: "unauthorized: Invalid Token" });
  }
};

export const authMiddleware = {
  adminValidateHeaders,
};
