const mongoose = require("mongoose");

const aptitudeTestSchema = new mongoose.Schema({
  studentId: { type: mongoose.Schema.Types.ObjectId, ref: "Student", required: true },
  verbalScore: { type: Number, required: true },
  quantitativeScore: { type: Number, required: true },
  generalKnowledgeScore: { type: Number, required: true },
  totalScore: { type: Number, required: true },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("AptitudeTest", aptitudeTestSchema);
