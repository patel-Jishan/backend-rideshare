const mongoose = require("mongoose");

const rideSchema = new mongoose.Schema({
  rider: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  driver: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  pickup: String,
  drop: String,
  status: {
    type: String,
    enum: ["pending", "accepted", "completed"],
    default: "pending",
  },
  fare: Number,
});

module.exports = mongoose.model("Ride", rideSchema);