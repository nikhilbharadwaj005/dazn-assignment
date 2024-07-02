"use strict";

import { joiValidate } from "../../lib";
import { JoiAuthHeaders } from "../validators";

const headerValidator = async (request, response, next) => {
  const { headers } = request;

  const { authorization } = headers;

  return joiValidate({ authorization }, JoiAuthHeaders, next);
};

export const headerMiddleware = {
  headerValidator,
};
