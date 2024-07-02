"use strict";

import { MONGO_MODEL } from "./MongoDB";

import nanoid from "nanoid-esm";

const list = async (query) => {
  const page = parseInt(query.page) || 1; // Current page number, default to 1
  const limit = parseInt(query.limit) || 10;
  const result = await MONGO_MODEL.mongoFind(
    "movies",
    {},
    { skip: (page - 1) * limit, limit }
  );

  return result || null;
};

const searchMovie = async (query) => {
  const { q, g } = query; // q - query for tile, g - query for genre

  const mongoQuery = {
    ...(q && { title: { $regex: q, $options: "i" } }),
    ...(g && { genre: { $regex: g, $options: "i" } }),
  };

  const result = await MONGO_MODEL.mongoFindOne("movies", mongoQuery);

  return { data: result };
};

const addMovie = async (body) => {
  const randomId = nanoid();
  body.id = randomId;
  const result = await MONGO_MODEL.mongoInsertOne("movies", body);
  if (result.acknowledged) {
    return { status: "success", id: randomId };
  } else {
    return { status: "Failed", message: "Something went wrong" };
  }
};

const updateMovie = async (params, body) => {
  const { id } = params;
  const updateResult = await MONGO_MODEL.mongoUpdateOne(
    "movies",
    { id },
    { $set: body }
  );
  if (updateResult.modifiedCount) {
    return { status: "success", id };
  } else {
    return {
      status: "Failed",
      message: "Movie not found, please check the id",
    };
  }
};

const deleteMovie = async (params) => {
  const { id } = params;
  const deleteResult = await MONGO_MODEL.mongoDeleteOne("movies", { id });
  return deleteResult.deletedCount
    ? { status: "success", id }
    : { status: "Failed", message: "Movie not found, please check the id" };
};

export const MOVIE_MODEL = {
  list,
  searchMovie,
  addMovie,
  updateMovie,
  deleteMovie,
};
