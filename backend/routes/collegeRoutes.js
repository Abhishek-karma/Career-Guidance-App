const express = require("express");
const collegeController = require("../controllers/collegeController");
const { studentAuth } = require("../utils/authMiddleware");
const router = express.Router();

// Public access routes
router.get("/", collegeController.getColleges);
router.get("/:id", collegeController.getCollegeById);

module.exports = router;