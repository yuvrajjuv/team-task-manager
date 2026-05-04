import express from "express";
const router = express.Router();

// ❗IMPORTANT: yaha auth middleware NAHI lagana login pe

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // dummy login (replace with DB logic)
    if (email === "test@test.com" && password === "123456") {
      return res.json({
        token: "dummy_token_123",
        user: { email },
      });
    }

    res.status(400).json({ message: "Invalid credentials" });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

export default router;