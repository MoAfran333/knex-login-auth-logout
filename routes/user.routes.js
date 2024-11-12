const express = require("express");
const {
  getProfile,
  updateProfile,
  deleteProfile,
} = require("../controllers/user.controllers");

const router = express.Router();

router.get("/profile", getProfile);
router.patch("/update", updateProfile);
router.delete("/delete", deleteProfile);

module.exports = router;
