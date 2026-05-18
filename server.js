import { createRequestHandler } from "@remix-run/express";
import express from "express";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = process.env.PORT || 3000;

app.use(
  "/assets",
  express.static(path.join(__dirname, "build/client/assets"), {
    immutable: true,
    maxAge: "1y",
  })
);

app.use(express.static(path.join(__dirname, "build/client"), { maxAge: "1h" }));

const build = await import("./build/server/index.js");

app.all(
  "*",
  createRequestHandler({
    build,
    mode: process.env.NODE_ENV,
  })
);

app.listen(port, "127.0.0.1", () => {
  console.log(`Entheotiki Remix app listening on http://127.0.0.1:${port}`);
});
