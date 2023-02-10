const express = require("express");
const { register, login, getUsername } = require("../controllers/auth");
const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/user/:id", getUsername);
router.get("/login", (req, res) => {
  res.render("login.ejs");
});
router.get("/register", (req, res) => {
  res.render("register.ejs");
});

module.exports = router;
