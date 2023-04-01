const supertest = require("supertest");
const app = require("../app");
const { signAccessToken } = require("../helpers/jwt_helper");
jest.setTimeout(50000);

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

describe("Test cases for TODO", () => {
  beforeAll(async () => {
    await sleep(6000);
  });

  describe("Todo", () => {
    describe("Todo", () => {
      it("should create todo", async () => {
        const reqBody = {
          title: "sample todo 1",
        };
        const token = await signAccessToken("6426aefd3d65eee5fa9ea51d", "USER");
        const response = await supertest(app)
          .post("/v1/todo")
          .send(reqBody)
          .set("Authorization", `Bearer ${token}`);
        expect(response.status).toEqual(201);
      });

      it("should return 422", async () => {
        const reqBody = {
          completed: true,
          id: "642700df123b1075a88ab38d",
          userId: "6426aefd3d65eee5fa9ea51d",
        };
        const token = await signAccessToken("6426aefd3d65eee5fa9ea51d", "USER");
        const response = await supertest(app)
          .put("/v1/todo/642700df123b1075a88ab38d")
          .send(reqBody)
          .set("Authorization", `Bearer ${token}`);
        expect(response.status).toEqual(422);
      });

      it("should update todo", async () => {
        const reqBody = {
          title: "demo todo 1",
          completed: true,
          id: "642700df123b1075a88ab38d",
          userId: "6426aefd3d65eee5fa9ea51d"
          
        };
        const token = await signAccessToken("6426aefd3d65eee5fa9ea51d", "USER");
        const response = await supertest(app)
          .put("/v1/todo/642700df123b1075a88ab38d")
          .send(reqBody)
          .set("Authorization", `Bearer ${token}`);
        expect(response.status).toEqual(200);
      });

      it("should return 404 when todo doesn't exits", async () => {
        const token = await signAccessToken("6426aefd3d65eee5fa9ea51d", "USER");
        const response = await supertest(app)
          .get("/v1/todo/6427002350076353910ae2d1")
          .set("Authorization", `Bearer ${token}`);
        expect(response.status).toEqual(404);
      });
      it("should return 200 when todo exists", async () => {
        const token = await signAccessToken("6426aefd3d65eee5fa9ea51d", "USER");
        const response = await supertest(app)
          .get("/v1/todo/642700df123b1075a88ab38d")
          .set("Authorization", `Bearer ${token}`);
        expect(response.status).toEqual(200);
      });
    });
  });
});
