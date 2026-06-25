const express = require("express");

const router = express.Router();

const progressController =
require("../controllers/progressController");

const verifyToken =
require("../middleware/authMiddleware");

router.post(
  "/complete",
  verifyToken,
  progressController.completeMaterial
);

router.get(
  "/",
  verifyToken,
  progressController.getProgress
);

module.exports = router;