const express = require("express");
const router = express.Router();

const {
  createProject,
  getProjects,
  updateProject,
  deleteProject
} = require("../controllers/projectController");

const authMiddleware = require("../middleware/authMiddleware");

// CREATE
router.post("/", authMiddleware, createProject);

// GET ALL
router.get("/", authMiddleware, getProjects);

// UPDATE
router.put("/:id", authMiddleware, updateProject);

// DELETE
router.delete("/:id", authMiddleware, deleteProject);

module.exports = router;