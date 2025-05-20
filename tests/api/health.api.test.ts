import { Application } from "express";
import request from "supertest";
import { App } from "../../src/utils";
import { disconnectDB } from "../../src/config";

let app: Application;

describe("API: Health Check", () => {
  beforeAll(async () => {
    const appInstance = await App.init();
    app = appInstance.getApp();
  });

  afterAll(async () => {
    await disconnectDB();
  });

  it("should return status code 200 with OK", async () => {
    const res = await request(app).get("/api/health");
    expect(res.statusCode).toBe(200);
    expect(res.text).toBe("OK");
  });
});
