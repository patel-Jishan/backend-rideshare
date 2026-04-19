const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema({
  driver: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  rider: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  rating: Number,
  comment: String,
});

module.exports = mongoose.model("Review", reviewSchema);