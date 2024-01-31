const express = require("express");
const router = express.Router();
const {
  register,
  login,
  getProfile,
} = require("../controllers/userController");

router.post("/", register);
router.post("/login", login);
router.get("/profile", getProfile);

module.exports = router;
