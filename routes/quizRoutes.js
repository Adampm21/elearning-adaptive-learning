const express = require("express");

const router = express.Router();

const quizController = require("../controllers/quizController");

const verifyToken = require("../middleware/authMiddleware");
const checkRole = require("../middleware/roleMiddleware");

router.get("/", verifyToken, quizController.getQuizzes);

router.post(
  "/",
  verifyToken,
  checkRole("admin", "pengajar"),
  quizController.createQuiz
);

router.delete(
  "/:id",
  verifyToken,
  checkRole("admin"),
  quizController.deleteQuiz
);

module.exports = router;