const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

// Test route
router.get("/test", (req, res) => {
    res.json({ ok: true });
});

// Register (NOW SAVING TO DB)
router.post("/register", async (req, res) => {
    try {
        const { name, email, password } = req.body;

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "Email already exists" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await User.create({
            name,
            email,
            password: hashedPassword
        });

        // ✅ FIXED PART (DO NOT RETURN PASSWORD)
        const { password: _, ...safeUser } = user._doc;

        res.json({
            message: "User registered",
            user: safeUser
        });

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Login (NOW CHECKING DB)
router.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "Invalid email or password" });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid email or password" });
        }

        const token = jwt.sign(
            { id: user._id, email: user.email },
            process.env.JWT_SECRET,
            { expiresIn: "1h" }
        );

        res.json({
            message: "Login successful",
            token
        });

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// 🔐 PROFILE (PROTECTED ROUTE)
router.get("/profile", authMiddleware, async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select("-password");

        res.json({
            message: "Profile data",
            user
        });

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;