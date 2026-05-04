const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();

// ================= MIDDLEWARE =================
app.use(express.json());
app.use(cors());

// ================= DB CONNECT =================
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected ✅"))
  .catch(err => console.log(err));

// ================= MODELS =================

// USER MODEL
const User = mongoose.model("User", new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  role: {
    type: String,
    enum: ["admin", "member"],
    default: "member"
  }
}));

// TASK MODEL
const Task = mongoose.model("Task", new mongoose.Schema({
  title: String,
  description: String,
  assignedTo: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },
  status: {
    type: String,
    enum: ["pending", "completed"],
    default: "pending"
  }
}));

// ================= AUTH ROUTES =================

// SIGNUP
app.post("/api/auth/signup", async (req, res) => {
  const { name, email, password, role } = req.body;

  try {
    const exist = await User.findOne({ email });

    if (exist) {
      return res.status(400).json({ msg: "User already exists" });
    }

    const user = new User({ name, email, password, role });
    await user.save();

    res.json({ msg: "Signup successful ✅" });

  } catch (err) {
    res.status(500).json({ msg: "Server error" });
  }
});

// LOGIN
app.post("/api/auth/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email, password });

    if (!user) {
      return res.status(400).json({ msg: "Invalid credentials ❌" });
    }

    res.json({
      token: "dummy-token",
      user
    });

  } catch (err) {
    res.status(500).json({ msg: "Server error" });
  }
});

// ================= USERS ROUTE =================

// 🔥 NEW (IMPORTANT)
app.get("/api/users", async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res.status(500).json({ msg: "Error fetching users" });
  }
});

// ================= TASK ROUTES =================

// CREATE TASK (ADMIN)
app.post("/api/tasks", async (req, res) => {
  const { title, description, assignedTo } = req.body;

  try {
    const task = new Task({ title, description, assignedTo });
    await task.save();

    res.json(task);

  } catch (err) {
    res.status(500).json({ msg: "Error creating task" });
  }
});

// GET TASKS FOR USER
app.get("/api/tasks/:userId", async (req, res) => {
  try {
    const tasks = await Task.find({ assignedTo: req.params.userId });
    res.json(tasks);

  } catch (err) {
    res.status(500).json({ msg: "Error fetching tasks" });
  }
});

// UPDATE TASK STATUS
app.put("/api/tasks/:id", async (req, res) => {
  const { status } = req.body;

  try {
    const task = await Task.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );

    res.json(task);

  } catch (err) {
    res.status(500).json({ msg: "Error updating task" });
  }
});

// ================= SERVER =================
app.listen(5000, () => {
  console.log("Server running on port 5000 🚀");
});