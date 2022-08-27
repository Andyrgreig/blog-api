const { body, validationResult } = require("express-validator");
const User = require("../models/user");

exports.validateUser = [
  body("username")
    .trim()
    .escape()
    .isLength({ min: 3 })
    .withMessage("Username must be at least 3 characters")
    .bail()
    .custom(async (username) => {
      try {
        const usernameExists = await User.findOne({ username: username });
        if (usernameExists) {
          throw new Error("Username already exists");
        }
      } catch (err) {
        console.log(err);
        throw new Error(err);
      }
    }),
  body("password")
    .trim()
    .escape()
    .isLength({ min: 8 })
    .withMessage("Password must be at least 8 characters long")
    .bail(),
  body("passwordConfirmation").custom((value, { req }) => {
    if (req.body.confirmPassword !== req.body.password) {
      throw new Error("Password and password confirmation do not match");
    }
    return true;
  }),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }
    next();
  },
];

exports.validateArticle = [
  body("title")
    .trim()
    .escape()
    .isLength({ min: 3 })
    .withMessage("Title must be at least 3 characters"),
  body("text")
    .trim()
    .escape()
    .isLength({ min: 20 })
    .withMessage("Text must be at least 20 characters"),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }
    next();
  },
];
