import request from "supertest";

import { DBConnections } from "../../Server";
let app;
beforeAll(async () => {
  await DBConnections();
  return (app = await import("../../App"));
});

const requiredValues = {};

describe("Test Movies Services", () => {
  describe("Admin signIn username and password", () => {
    test("should login", async () => {
      const response = await request(app.default).post("/user/signIn").send({
        userName: "micheal",
        password: "testing",
      });
      // console.log("🚀 ~ response ~ response:", response.body.data.token);
      expect(response.body.data.token).toBeTruthy();
      if (response.body.data.token) {
        requiredValues.adminToken = response.body.data.token;
      }
    });
  });

  describe("Get Movies list", () => {
    test("Admin get movies request", async () => {
      const response = await request(app.default)
        .get("/movies")
        .set({
          Authorization: `Bearer ${requiredValues.adminToken}`,
        });
      expect(response.body.data.data).toBeInstanceOf(Array);
    });
  });

  describe("Admin add movie", () => {
    test("Admin should be able to add movie", async () => {
      const response = await request(app.default)
        .post("/movies")
        .set({
          Authorization: `Bearer ${requiredValues.adminToken}`,
        })
        .send({
          title: "Kalki",
          genre: "SCIFI",
          rating: 6.4,
          cdnLink: "https://cdn.dazn.com/movieName.mp4",
        });
      expect(response.body.data.result.status).toBe("success");
      requiredValues.movieId = response.body.data.result.id;
    });
  });

  describe("Admin update movie", () => {
    test("Admin should able to update Movie", async () => {
      const response = await request(app.default)
        .put(`/movies/${requiredValues.movieId}`)
        .set({
          Authorization: `Bearer ${requiredValues.adminToken}`,
        })
        .send({
          title: "KALKI",
        });
      expect(response.body.data.result.status).toBe("success");
    });
  });

  describe("Admin delete movie", () => {
    test("Admin should be able to delete Movie", async () => {
      const response = await request(app.default)
        .delete(`/movies/${requiredValues.movieId}`)
        .set({
          Authorization: `Bearer ${requiredValues.adminToken}`,
        });
      expect(response.body.data.result.status).toBe("success");
    });
  });
});
