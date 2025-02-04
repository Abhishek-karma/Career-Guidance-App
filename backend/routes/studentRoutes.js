const express = require("express");
const studentController = require("../controllers/studentController");
const { studentAuth } = require("../utils/authMiddleware");
const collegeController = require("../controllers/collegeController");
const router = express.Router();

// Authentication
router.post("/register", studentController.register);
router.post("/login", studentController.login);

// Profile Management
router.get("/profile", studentAuth, studentController.getProfile);
router.patch("/location", studentAuth, studentController.updateLocationPreference);

// College Operations
router.get("/colleges", studentAuth, studentController.getEligibleColleges);
router.post("/register-college", studentAuth, studentController.registerCollege);

// collegeRoutes.js
router.get("/", studentAuth, collegeController.getColleges);
router.get("/:id", studentAuth, collegeController.getCollegeById);
module.exports = router;