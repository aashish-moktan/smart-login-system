import request from "supertest";
import { App } from "../src/utils";

const app = App.getApp();

describe("GET /api/health", () => {
  it("should return OK", async () => {
    const res = await request(app).get("/api/health");
    expect(res.statusCode).toBe(200);
    expect(res.text).toBe("OK");
  });
});
