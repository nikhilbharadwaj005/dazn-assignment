"use strict";

import { ResponseBody } from "../../lib";

import { MoviesRouter } from "./Movies";
import { UserRouter } from "./Users";

const Routes = [
  { path: "/user", router: UserRouter },
  { path: "/", router: MoviesRouter },
];

Routes.init = (app) => {
  if (!app || !app.use) {
    console.error(
      "[Error] Route Initialization Failed: app / app.use is undefined"
    );
    return process.exit(1);
  }

  Routes.forEach((route) => app.use(route.path, route.router));

  app.get("/health-check", (request, response, next) => {
    const reponseBody = new ResponseBody(200, "Success");
    response.status(reponseBody.status).json(reponseBody);
  });

  app.get("*", (request, response, next) => {
    const error = {
      statusCode: 404,
      message: ["Cannot", request.method, request.originalUrl].join(" "),
    };
    next(error);
  });

  app.use((error, request, response, body) => {
    if (!error) {
      return;
    }

    if (error.statusCode) {
      response.statusMessage = error.message;
      return response.status(error.statusCode).json(error.message);
    }

    const err = {
      statusCode: 500,
      message: error.toString(),
    };

    response.statusMessage = err.message;
    return response.status(err.statusCode).json(err);
  });
};

export default Routes;
