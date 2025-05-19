import request from "supertest";
import { App } from "../src/utils";

const app = App.getApp();

describe("GET /api/users", () => {
  it("should return empty user list", async () => {
    const res = await request(app).get("/api/v1/users");
    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual([]);
  });
});
