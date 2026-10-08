import express from "express";
import { HealthResponseSchema } from "@assistrep/shared";

export function createApp() {
  const app = express();

  app.disable("x-powered-by");
  app.get("/api/v1/health", (_request, response) => {
    const body = HealthResponseSchema.parse({
      status: "ok",
      service: "api",
      timestamp: new Date().toISOString(),
    });

    response.json(body);
  });

  return app;
}
