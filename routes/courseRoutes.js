const express = require("express");

const router = express.Router();

const courseController = require("../controllers/courseController");

const verifyToken = require("../middleware/authMiddleware");
const checkRole = require("../middleware/roleMiddleware");

router.get("/", verifyToken, courseController.getCourses);

router.get("/:id", verifyToken, courseController.getCourseById);

router.post(
  "/",
  verifyToken,
  checkRole("admin", "pengajar"),
  courseController.createCourse
);

router.put(
  "/:id",
  verifyToken,
  checkRole("admin", "pengajar"),
  courseController.updateCourse
);

router.delete(
  "/:id",
  verifyToken,
  checkRole("admin"),
  courseController.deleteCourse
);

module.exports = router;