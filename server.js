import express from "express";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = process.env.PORT || 3000;

// Serve static assets from the Vite/Remix client build
app.use(express.static(path.join(__dirname, "build/client")));

// Fallback: always serve index.html for any route (SPA behavior)
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "build/client/index.html"));
});

app.listen(port, () => {
  console.log(`Entheotiki globe app running on port ${port}`);
});
