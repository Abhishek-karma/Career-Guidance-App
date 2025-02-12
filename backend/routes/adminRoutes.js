const express = require("express");
const adminController = require("../controllers/adminController");
const collegeController = require("../controllers/collegeController");
const { adminAuth } = require("../utils/authMiddleware");
const router = express.Router();

router.post("/register", adminController.register);
router.post("/login", adminController.login);

router.get("/stats", adminAuth, adminController.getAdminStats);

router.post("/add-colleges", adminAuth, collegeController.addCollege);
router.put("/colleges/:id", adminAuth, collegeController.updateCollege);
router.delete("/colleges/:id", adminAuth, collegeController.deleteCollege);
router.get("/get-students", adminAuth, adminController.getAllStudents);

router.post("/questions", adminAuth, adminController.createQuestions);
router.get("/questions", adminAuth, adminController.getAllQuestions);
router.delete("/questions/:id", adminAuth, adminController.deleteQuestion);

router.get("/colleges", adminAuth, collegeController.getColleges);
router.get("/colleges/:id", adminAuth, collegeController.getCollegeById);
module.exports = router;
