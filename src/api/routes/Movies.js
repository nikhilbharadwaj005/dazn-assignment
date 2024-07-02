"use strict";

import Express from "express";

import { watchTower } from "../helpers";

import { authMiddleware, headerMiddleware } from "../middlewares";

import { SendResponse } from "../../lib/SendResponse";
import { moviesController } from "../controllers";

const { sendResponse } = SendResponse;
const { adminValidateHeaders } = authMiddleware;
const { headerValidator } = headerMiddleware;

const MoviesRouter = new Express.Router();

MoviesRouter.get(
  "/movies",
  watchTower(headerValidator),
  watchTower(moviesController.getMovies)
);

MoviesRouter.get(
  "/search",
  watchTower(headerValidator),
  watchTower(moviesController.searchMovie)
);

MoviesRouter.post(
  "/movies",
  watchTower(headerValidator),
  watchTower(adminValidateHeaders),
  watchTower(moviesController.addMovie)
);

MoviesRouter.put(
  "/movies/:id",
  watchTower(headerValidator),
  watchTower(adminValidateHeaders),
  watchTower(moviesController.updateMovie)
);

MoviesRouter.delete(
  "/movies/:id",
  watchTower(headerValidator),
  watchTower(adminValidateHeaders),
  watchTower(moviesController.deleteMovie)
);

MoviesRouter.use(sendResponse);

export { MoviesRouter };
