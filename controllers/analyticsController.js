const Ride = require("../models/Ride");

exports.getAnalytics = async (req, res) => {
  const totalRides = await Ride.countDocuments();

  const completed = await Ride.countDocuments({ status: "completed" });

  const revenue = await Ride.aggregate([
    { $match: { status: "completed" } },
    { $group: { _id: null, total: { $sum: "$fare" } } },
  ]);

  res.json({
    totalRides,
    completed,
    revenue: revenue[0]?.total || 0,
  });
};