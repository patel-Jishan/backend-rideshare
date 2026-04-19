const router = require("express").Router();
const rideController = require("../controllers/rideController");
const auth = require("../middleware/authMiddleware");
const role = require("../middleware/roleMiddleware");

// Rider → create ride
router.post("/", auth, role("rider"), rideController.createRide);

// Driver → accept ride
router.put("/accept/:id", auth, role("driver"), rideController.acceptRide);

// Driver → complete ride
router.put("/complete/:id", auth, role("driver"), rideController.completeRide);

// Search (public)
router.get("/search", rideController.searchRides);

module.exports = router;