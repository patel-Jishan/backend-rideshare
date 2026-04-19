const router = require("express").Router();
const analyticsController = require("../controllers/analyticsController");
const auth = require("../middleware/authMiddleware");
const role = require("../middleware/roleMiddleware");

// Only Admin
router.get("/", auth, role("admin"), analyticsController.getAnalytics);

module.exports = router;