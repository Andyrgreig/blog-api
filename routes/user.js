const express = require("express");
const user = require("../controllers/user");
const passport = require("passport");

const router = express.Router();

// GET single user
// router.get("/:id", user.getUser);

// GET all users
// router.get("/", user.getAllUsers);

// POST new user
router.post("/register", user.register);

// GET user info (login)
router.get("/login", user.login);

// GET user logout
router.get("/logout", user.logout);

module.exports = router;
