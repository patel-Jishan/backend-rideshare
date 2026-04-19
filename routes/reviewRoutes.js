const router = require("express").Router();
const reviewController = require("../controllers/reviewController");
const auth = require("../middleware/authMiddleware");
const role = require("../middleware/roleMiddleware");

// Only Rider can give review
router.post("/", auth, role("rider"), reviewController.addReview);

// Anyone can view
router.get("/:id", reviewController.getDriverReviews);

module.exports = router;