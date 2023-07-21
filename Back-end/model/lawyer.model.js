const mongoose = require("mongoose");

const lawyerSchema = mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user", // Referencing the User model
    required: true,
    unique: true,
  },
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  isVerified: {
    type: String,
  },
  image: {
    type: String,
    required: true,
  },
  specialization: {
    type: String,
    required: true,
  },
  practiceAreas: {
    type: [String],
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
});

const LawyerModel = mongoose.model("lawyer", lawyerSchema);

module.exports = { LawyerModel };
