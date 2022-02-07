const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  asset: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
    min: 6,
  },
  userId: { type: String, required: true },
  bidsList: { type: Array, default: [] },
  sold: { type: Boolean, default: false },
  endTimeStamp: { type: Date, default: Date.now },
});

// Exporting the schema
module.exports = mongoose.model("Product", userSchema);
