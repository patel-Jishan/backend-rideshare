const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  role: {
    type: String,
    enum: ["rider", "driver", "admin"],
  },
  rating: { type: Number, default: 5 },
});

module.exports = mongoose.model("User", userSchema);