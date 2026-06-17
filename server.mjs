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
  let targetUrl = req.query.url;
  if (!targetUrl) return res.status(400).json({ error: "Missing url" });

  if (targetUrl.includes("/dapi/menu/pl")) {
    targetUrl += targetUrl.includes("?") ? "&" : "?";
    targetUrl += "submitAction=ENTER";
  }

  for (let attempt = 0; attempt < 5; attempt++) {
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
      const text = await response.text();
      if (response.status === 202 || text.length === 0) {
        console.log(`Menu attempt ${attempt + 1}: ${response.status}, body length: ${text.length}, retrying...`);
        await new Promise(r => setTimeout(r, 2000));
        continue;
      }
      if (!response.ok) {
        return res.status(response.status).json({ error: `Upstream ${response.status}`, detail: text.slice(0, 200) });
      }
      let data;
      try { data = JSON.parse(text); } catch (e) {
        return res.status(502).json({ error: "Upstream returned non-JSON", detail: text.slice(0, 500) });
      }
      return res.json(data);
    } catch (err) {
      if (attempt === 4) return res.status(500).json({ error: err.message });
      await new Promise(r => setTimeout(r, 2000));
    }
  }
  res.status(504).json({ error: "Upstream timed out after 5 retries" });
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
