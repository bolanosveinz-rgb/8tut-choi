import request from "supertest";
import { describe, expect, it } from "vitest";
import { HealthResponseSchema } from "@assistrep/shared";
import { createApp } from "./app.js";

describe("GET /api/v1/health", () => {
  it("returns a valid API health response", async () => {
    const response = await request(createApp()).get("/api/v1/health");

    expect(response.status).toBe(200);
    expect(HealthResponseSchema.safeParse(response.body).success).toBe(true);
  });
});
