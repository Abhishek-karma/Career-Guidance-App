const express = require("express");
const studentController = require("../controllers/studentController");
const { studentAuth } = require("../utils/authMiddleware");

const router = express.Router();

// 🔹 Authentication
router.post("/register", studentController.register);
router.post("/login", studentController.login);

// 🔹 Profile Management
router.get("/profile", studentAuth, studentController.getProfile);
router.patch("/location", studentAuth, studentController.updateLocationPreference);

// 🔹 College Operations
router.get("/college-for-me", studentAuth, studentController.getEligibleColleges);
router.post("/register-college", studentAuth, studentController.registerCollege);
router.get('/recommendations', studentAuth, studentController.getRecommendedColleges);

module.exports = router;