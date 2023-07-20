const mongoose = require("mongoose");

const lawyerSchema = mongoose.Schema({
  lawyerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user", // Referencing the User model
    required: true,
    unique: true,
  },
  location: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  specialization: {
    type: String,
    required: true,
  },
  slots: [
    {
      startTime: {
        type: String,
      },
    },
  ],
  practiceAreas: {
    type: [String],
    required: true,
  },
});

const LawyerModel = mongoose.model("lawyer", lawyerSchema);

module.exports = { LawyerModel };
