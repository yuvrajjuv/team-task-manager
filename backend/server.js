const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(express.json());
app.use(cors());

// ================= DB CONNECT =================
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

// ================= MODELS =================

// USER
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

// TASK
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

// ================= AUTH =================

app.post("/api/auth/signup", async (req, res) => {
  const { name, email, password, role } = req.body;

  const exist = await User.findOne({ email });
  if (exist) return res.status(400).json({ msg: "User already exists" });

  const user = new User({ name, email, password, role });
  await user.save();

  res.json({ msg: "Signup success" });
});

app.post("/api/auth/login", async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email, password });
  if (!user) return res.status(400).json({ msg: "Invalid credentials" });

  res.json({
    token: "dummy-token",
    user
  });
});

// ================= TASK ROUTES =================

// CREATE TASK (ADMIN)
app.post("/api/tasks", async (req, res) => {
  const { title, description, assignedTo } = req.body;

  const task = new Task({ title, description, assignedTo });
  await task.save();

  res.json(task);
});

// GET TASKS (USER)
app.get("/api/tasks/:userId", async (req, res) => {
  const tasks = await Task.find({ assignedTo: req.params.userId });
  res.json(tasks);
});

// UPDATE TASK STATUS
app.put("/api/tasks/:id", async (req, res) => {
  const { status } = req.body;

  const task = await Task.findByIdAndUpdate(
    req.params.id,
    { status },
    { new: true }
  );

  res.json(task);
});

// ================= START SERVER =================
app.listen(5000, () => console.log("Server running on 5000"));