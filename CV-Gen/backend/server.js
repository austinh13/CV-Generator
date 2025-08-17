// server.js or /api/rewrite-description.js
import express from "express";
import cors from "cors";
import OpenAI from "openai";

const app = express();
app.use(cors({ origin: "http://localhost:5173" }));
app.use(express.json());

const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

app.post("/api/rewrite-description", async (req, res) => {
  const { description } = req.body;
  try {
    const response = await client.responses.create({
      model: "gpt-4.1-mini",
      input: `Rewrite this job description more professionally in under 125 characters:\n${description}`,
    });
    res.json({ rewritten: response.output_text });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "OpenAI request failed" });
  }
});

app.listen(3000, () => console.log("Server running on port 3000"));
