const express = require("express");
const { login, signup, logout } = require("../controllers/auth.controllers");

const router = express.Router();

router.get("/login", login);
router.post("/signup", signup);
router.get("/logout", logout);

module.exports = router;
