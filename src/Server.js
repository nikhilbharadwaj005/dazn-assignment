"use strict";

import { MongoClient } from "mongodb";

import { SERVER_CONFIG, MONGO_CONFIG, REDIS_CONFIG } from "./config";

import Redis from "ioredis";

const { REDIS_HOST, REDIS_PORT, REDIS_PWD } = REDIS_CONFIG;
const { PORT } = SERVER_CONFIG;
const { CONNECTION_URI, MONGO_DBNAME } = MONGO_CONFIG;

export let mongoClientDB;
export let redisClient;

export const DBConnections = async () => {
  try {
    console.log("[Info] Connecting to MongoDB...");
    const mongoClientUse = new MongoClient(CONNECTION_URI);
    await mongoClientUse.connect();
    mongoClientDB = mongoClientUse.db(MONGO_DBNAME);
    console.log(
      `[Info] MongoDB Connection to Database ' ${MONGO_DBNAME} ' Successful!`
    );
    console.log("[Info] Connecting to redis....");

    redisClient = new Redis(
      `redis://:${REDIS_PWD}@${REDIS_HOST}:${REDIS_PORT}`,
      { showFriendlyErrorStack: true }
    );
    console.log("[Info] Server started Successfully! ");
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const closeDBConnections = async () => {
  try {
    await mongoClientDB.s.client.close();
    console.log("MongoDB connection closed");
  } catch (err) {
    console.error("Error closing MongoDB connection:", err);
  }
};

export const startServer = async () => {
  await DBConnections();
  const App = await import("./App");
  App.default.listen(PORT);
};

// export default server;
