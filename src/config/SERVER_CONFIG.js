"use strict";

const {
  APP_VERSION,
  BODY_LIMIT,
  CORS_METHODS,
  CORS_ORIGIN,
  PARAMETER_LIMIT,
  PORT,
} = process.env;

const SERVER_CONFIG = {
  APP_VERSION,
  BODY_LIMIT,
  CORS_METHODS,
  CORS_ORIGIN,
  PARAMETER_LIMIT,
  PORT,
};

Object.keys(SERVER_CONFIG).forEach((key) => {
  if (!SERVER_CONFIG[key]) {
    console.log("[Error] Missing SERVER config:", key);
    return process.exit(1);
  }
});

export { SERVER_CONFIG };
