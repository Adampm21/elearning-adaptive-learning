const express = require("express");

const router = express.Router();

const optionController =
require("../controllers/optionController");

const verifyToken =
require("../middleware/authMiddleware");

const checkRole =
require("../middleware/roleMiddleware");

router.get(
  "/",
  verifyToken,
  optionController.getOptions
);

router.post(
  "/",
  verifyToken,
  checkRole("admin", "pengajar"),
  optionController.createOption
);

router.delete(
  "/:id",
  verifyToken,
  checkRole("admin"),
  optionController.deleteOption
);

module.exports = router;