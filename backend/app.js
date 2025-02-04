const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const connectDB = require("./config/db");
const adminRoutes = require("./routes/adminRoutes");
const studentRoutes = require("./routes/studentRoutes");
const aptitudeTestRoutes = require("./routes/aptitudeTestRoutes");
const collegeRoutes = require("./routes/collegeRoutes");

const app = express();

// Middleware
app.use(cors());
app.use(express.json()); 
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());
// Database Connection
connectDB();

// Routes
app.use("/api/admin", adminRoutes);
app.use("/api/students", studentRoutes);
app.use("/api/aptitude-test", aptitudeTestRoutes);
app.use("/api/colleges", collegeRoutes);

module.exports = app;
