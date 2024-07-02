"use strict";

import Express from "express";
import mongoSanitize from "express-mongo-sanitize";
import { SERVER_CONFIG } from "./config";
import cors from "cors";
import helmet from "helmet";

import Routes from "./api/routes";

import server from "./Server";

const { BODY_LIMIT, CORS_ORIGIN, CORS_METHODS, PARAMETER_LIMIT } =
  SERVER_CONFIG;

const App = new Express();
const corsOptions = { origin: CORS_ORIGIN, methods: CORS_METHODS };

App.use(helmet());
App.disable("etag");
App.use(cors(corsOptions));
App.use(Express.json({ limit: BODY_LIMIT }));
App.use(
  Express.urlencoded({
    limit: BODY_LIMIT,
    extended: true,
    parameterLimit: PARAMETER_LIMIT,
  })
);
App.use(mongoSanitize());

Routes.init(App);

// server(App);

export default App;
