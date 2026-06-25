const express = require("express");

const router = express.Router();

const materialController = require("../controllers/materialController");

const verifyToken = require("../middleware/authMiddleware");
const checkRole = require("../middleware/roleMiddleware");

router.get("/", verifyToken, materialController.getMaterials);

router.post(
  "/",
  verifyToken,
  checkRole("admin", "pengajar"),
  materialController.createMaterial
);

router.put(
  "/:id",
  verifyToken,
  checkRole("admin", "pengajar"),
  materialController.updateMaterial
);

router.delete(
  "/:id",
  verifyToken,
  checkRole("admin"),
  materialController.deleteMaterial
);

module.exports = router;