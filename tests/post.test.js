const supertest = require("supertest");
const app = require("../app");
const { signAccessToken } = require("../helpers/jwt_helper");
jest.setTimeout(50000);

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

describe("Test cases for POST", () => {
  beforeAll(async () => {
    await sleep(7000);
  });

  describe("Post", () => {
    it("should create post", async () => {
      const reqBody = {
        title: "demo post 1",
        body: "demo post 1 demo post 1 demo post 1 demo post 1 demo post 1 demo post 1 demo post 1 demo post 1 demo post 1 demo post 1 demo post 1 demo post 1",
      };
      const token = await signAccessToken("6426aefd3d65eee5fa9ea51d", "USER");
      const response = await supertest(app)
        .post("/v1/post")
        .send(reqBody)
        .set("Authorization", `Bearer ${token}`);
      expect(response.status).toEqual(201);
    });

    it("should return 422", async () => {
      const reqBody = {
        body: "demo post 1 demo post 1 demo post 1 demo post 1 demo post 1 demo post 1 demo post 1 demo post 1 demo post 1 demo post 1 demo post 1 demo post 1",
      };
      const token = await signAccessToken("6426aefd3d65eee5fa9ea51d", "USER");
      const response = await supertest(app)
        .post("/v1/post")
        .send(reqBody)
        .set("Authorization", `Bearer ${token}`);
      expect(response.status).toEqual(422);
    });

    it("should update post", async () => {
      const reqBody = {
        id: "64271c09402e264dfc580315",
        title: "demo post 1",
        body: "demo post 1 demo post 1 demo post 1 demo post 1 demo post 1 demo post 1 demo post 1 demo post 1 demo post 1 demo post 1 demo post 1 demo post 1",
        userId: "6426aefd3d65eee5fa9ea51d",
      };
      const token = await signAccessToken("6426aefd3d65eee5fa9ea51d", "USER");
      const response = await supertest(app)
        .put("/v1/post/64271c09402e264dfc580315")
        .send(reqBody)
        .set("Authorization", `Bearer ${token}`);
      expect(response.status).toEqual(200);
    });

    it("should return 404 when post doesn't exits", async () => {
      const token = await signAccessToken("6426aefd3d65eee5fa9ea51d", "USER");
      const response = await supertest(app)
        .get("/v1/post/6427af5b00b1ddfcc12bdce8")
        .set("Authorization", `Bearer ${token}`);
      expect(response.status).toEqual(404);
    });
    it("should return 200 when post exists", async () => {
      const token = await signAccessToken("6426aefd3d65eee5fa9ea51d", "USER");
      const response = await supertest(app)
        .get("/v1/post/64271c09402e264dfc580315")
        .set("Authorization", `Bearer ${token}`);
      expect(response.status).toEqual(200);
    });
  });
});
