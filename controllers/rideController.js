const Ride = require("../models/Ride");
const User = require("../models/User");
const calculateFare = require("../utils/fareCalculator");
const getDistance = require("../config/mapbox")


exports.createRide = async (req, res) => {
  try {
    const { pickup, drop } = req.body;

    const distanceData = await getDistance(pickup, drop);

    const distanceInKm = distanceData?.distance_km;

    if (!distanceInKm || isNaN(distanceInKm)) {
      return res.status(400).json({ message: "Invalid distance" });
    }

    const fare = calculateFare(distanceInKm);

    const ride = await Ride.create({
      rider: req.user.id,
      pickup,
      drop,
      fare,
    });

    res.json(ride);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


exports.acceptRide = async (req, res) => {
  const ride = await Ride.findById(req.params.id);

  ride.driver = req.user.id;
  ride.status = "accepted";

  await ride.save();

  res.json(ride);
};

exports.completeRide = async (req, res) => {
  const ride = await Ride.findById(req.params.id);

  ride.status = "completed";

  await ride.save();

  res.json(ride);
};

exports.searchRides = async (req, res) => {
  try {
    const { pickup, drop } = req.query;

    let query = {};

    if (pickup) {
      query.pickup = { $regex: String(pickup), $options: "i" };
    }

    if (drop) {
      query.drop = { $regex: String(drop), $options: "i" };
    }

    const rides = await Ride.find(query);

    res.json(rides);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};