const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();

// ===== MIDDLEWARE =====
app.use(cors());
app.use(express.json());

// ===== ROOT ROUTE (VERY IMPORTANT FOR RAILWAY) =====
app.get("/", (req, res) => {
  res.send("Server is running 🚀");
});

// ===== SAMPLE ROUTE (test ke liye) =====
app.get("/api/test", (req, res) => {
  res.json({ message: "API working ✅" });
});

// ===== DATABASE CONNECTION =====
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB Connected ✅");
  })
  .catch((err) => {
    console.log("MongoDB Error ❌", err);
  });

// ===== YOUR ROUTES (agar hai to uncomment karo) =====
// const taskRoutes = require("./routes/taskRoutes");
// app.use("/api/tasks", taskRoutes);

// ===== ERROR HANDLER =====
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Something went wrong" });
});

// ===== SERVER START =====
const PORT = process.env.PORT || 3000;

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on port ${PORT} 🚀`);
});