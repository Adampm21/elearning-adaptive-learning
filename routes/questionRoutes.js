const express = require("express");

const router = express.Router();

const questionController =
  require("../controllers/questionController");

const verifyToken =
  require("../middleware/authMiddleware");

const checkRole =
  require("../middleware/roleMiddleware");

router.get(
  "/",
  verifyToken,
  questionController.getQuestions
);

router.post(
  "/",
  verifyToken,
  checkRole("admin", "pengajar"),
  questionController.createQuestion
);

router.delete(
  "/:id",
  verifyToken,
  checkRole("admin"),
  questionController.deleteQuestion
);

module.exports = router;