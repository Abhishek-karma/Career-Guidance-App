const mongoose = require("mongoose");

const questionSchema = new mongoose.Schema({
  section: { 
    type: String, 
    enum: ["verbal", "quantitative", "general"], 
    required: true 
  },
  questionText: { type: String, required: true },
  options: [{ type: String }],
  correctAnswerIndex: { type: Number, required: true }
});

module.exports = mongoose.model("Question", questionSchema);