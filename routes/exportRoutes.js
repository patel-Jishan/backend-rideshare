const router = require("express").Router();
const exportController = require("../controllers/exportController");

// Export CSV
router.get("/csv", exportController.exportCSV);

// Export PDF
router.get("/pdf", exportController.exportPDF);

module.exports = router;