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

app.get("/api/proxy", async (req, res) => {
  const targetUrl = req.query.url;
  if (!targetUrl) return res.status(400).json({ error: "Missing url" });
  try {
    const response = await fetch(targetUrl, {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.0.0 Safari/537.36",
        Accept: "application/json",
        Referer: "https://www.swiggy.com/",
        Origin: "https://www.swiggy.com",
      },
    });
    if (!response.ok) {
      const text = await response.text();
      console.error(`Upstream ${response.status}:`, text.slice(0, 500));
      return res.status(response.status).json({ error: `Upstream ${response.status}`, detail: text.slice(0, 200) });
    }
    const data = await response.json();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
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
