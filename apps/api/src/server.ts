import { createApp } from "./app.js";

const port = Number(process.env.PORT ?? process.env.API_PORT ?? 4000);

if (!Number.isInteger(port) || port < 1 || port > 65535) {
  throw new Error("PORT must be an integer between 1 and 65535.");
}

createApp().listen(port, "0.0.0.0", () => {
  console.info(`AssistRep API listening on port ${port}`);
});
