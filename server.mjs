import express from "express";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();
const PORT = process.env.PORT || 3000;

app.use((_req, res, next) => {
  res.setHeader("Permissions-Policy", "camera=(), microphone=(), geolocation=()");
  next();
});

app.use((req, _res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

app.get("/api/proxy", async (req, res) => {
  const targetUrl = req.query.url;
  if (!targetUrl) return res.status(400).json({ error: "Missing url" });
  try {
    const response = await fetch(targetUrl);
    if (!response.ok)
      return res.status(response.status).json({ error: `Upstream ${response.status}` });
    const data = await response.json();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get("/api/check", (_req, res) => {
  const distPath = path.join(__dirname, "dist");
  const files = fs.existsSync(distPath) ? fs.readdirSync(distPath) : [];
  res.json({
    cwd: process.cwd(),
    dirname: __dirname,
    distExists: fs.existsSync(distPath),
    distFiles: files,
    nodeVersion: process.version,
  });
});

app.use(express.static(path.join(__dirname, "dist")));

app.get("*", (_req, res) => {
  const filePath = path.join(__dirname, "dist", "index.html");
  if (fs.existsSync(filePath)) {
    res.sendFile(filePath);
  } else {
    res.status(500).send(`dist/index.html not found at ${filePath}`);
  }
});

app.listen(PORT, () => console.log(`Listening on ${PORT}`));
