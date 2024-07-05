const express = require("express");
const { signUp, logIn } = require("../Controllers/authController");
const router = express.Router();

router.post("/signUp", signUp);
router.post("/login", logIn);

module.exports = router;
