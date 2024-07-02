"use strict";

import { ResponseBody } from "../../lib";

import { MOVIE_MODEL } from "../models";

const getMovies = async (request, response, next) => {
  const { query } = request;
  const result = await MOVIE_MODEL.list(query);
  const responseBody = new ResponseBody(200, "Success", { data: result });
  response.body = responseBody;

  next();
};

const searchMovie = async (request, response, next) => {
  const { query } = request;
  const result = await MOVIE_MODEL.searchMovie(query);
  const responseBody = new ResponseBody(200, "Success", { result });
  response.body = responseBody;
  next();
};

const addMovie = async (request, response, next) => {
  const { body } = request;
  const result = await MOVIE_MODEL.addMovie(body);
  const responseBody = new ResponseBody(200, "Success", { result });
  response.body = responseBody;
  next();
};

const updateMovie = async (request, response, next) => {
  const { params, body } = request;
  const result = await MOVIE_MODEL.updateMovie(params, body);
  const responseBody = new ResponseBody(200, "Success", { result });
  response.body = responseBody;
  next();
};

const deleteMovie = async (request, response, next) => {
  const { params } = request;
  const result = await MOVIE_MODEL.deleteMovie(params);
  const responseBody = new ResponseBody(200, "Success", { result });
  response.body = responseBody;
  next();
};

export const moviesController = {
  getMovies,
  searchMovie,
  addMovie,
  updateMovie,
  deleteMovie,
};
