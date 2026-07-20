const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();

const authRoutes = require("./routes/auth");
const orderRoutes = require("./routes/orders");
const productRoutes = require("./routes/products");

const app = express();

// 🟢 Middleware
app.use(express.json());
app.use(cors({
  origin: "*",
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));

// 🟢 Routes
app.use("/api/auth", authRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/products", productRoutes);

// 🤖 AI Chat Route
app.post("/api/chat", async (req, res) => {
  try {
    const { messages, system } = req.body;

    const groqMessages = [
      { role: "system", content: system || "You are a helpful assistant." },
      ...messages.map(m => ({
        role: m.role === "assistant" ? "assistant" : "user",
        content: m.content
      }))
    ];

    const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${process.env.GROQ_API_KEY}`
      },
      body: JSON.stringify({
        model: "openai/gpt-oss-120b",
        messages: groqMessages,
        max_tokens: 1000
      })
    });

    const data = await response.json();

    if (!response.ok) {
      console.error("Groq API error:", response.status, JSON.stringify(data));
      return res.status(500).json({
        error: { message: data.error?.message || `Groq request failed with status ${response.status}` }
      });
    }

    const text = data.choices?.[0]?.message?.content;

    if (!text) {
      console.error("Groq returned no content. Full response:", JSON.stringify(data));
      return res.status(500).json({
        error: { message: "Groq returned no response" }
      });
    }

    res.json({ content: [{ text }] });

  } catch (err) {
    console.error("Chat error:", err.message);
    res.status(500).json({
      error: { message: err.message }
    });
  }
});

// 🟢 Health check
app.get("/", (req, res) => {
  res.json({ status: "API WORKING 🚀" });
});

// 🟢 MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected ✅"))
  .catch(err => console.error("MongoDB Error ❌:", err.message));

// 🟢 PORT (IMPORTANT for Railway)
const PORT = process.env.PORT || 3000;

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on port ${PORT} 🚀`);
});