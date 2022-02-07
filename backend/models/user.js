// User Schema
const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
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
    min: 6,
  },
  walletItems: { type: Array, default: [] },
  walletBalance: { type: Number, default: 0 },
  activeBids: { type: Array, default: [] },
  engagedWalletBalance: { type: Number, default: 0 },
});

// Exporting the schema
module.exports = mongoose.model("User", userSchema);
