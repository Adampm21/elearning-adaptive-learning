const express = require("express");

const router = express.Router();

const resultController =
  require("../controllers/resultController");

const verifyToken =
  require("../middleware/authMiddleware");

router.get(
  "/",
  verifyToken,
  resultController.getResults
);

router.post(
  "/",
  verifyToken,
  resultController.submitResult
);

module.exports = router;