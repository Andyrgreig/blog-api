const User = require("../models/user");
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcrypt");
const utils = require("../lib/utils");

exports.getUser = (req, res) => {
  console.log("3");
};

exports.getAllUsers = (req, res) => {
  console.log("2");
};

exports.register = [
  body("username", "Username must be at least 3 characters long")
    .trim()
    .isLength({ min: 3 })
    .escape()
    .custom(async (username) => {
      try {
        const usernameExists = await User.findOne({ username: username });
        if (usernameExists) {
          throw new Error("Username already exists");
        }
      } catch (err) {
        throw new Error(err);
      }
    }),
  body("password", "Password must be at least 8 characters long")
    .trim()
    .isLength({ min: 8 })
    .escape(),
  body("passwordConfirmation").custom((value, { req }) => {
    if (req.body.confirmPassword !== req.body.password) {
      throw new Error("Password and password confirmation do not match");
    }
    return true;
  }),

  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      res.status(400).json({ message: errors.array() });
      return;
    } else {
      try {
        // const hash = await utils.genPassword(req.body.password);
        const hash = await bcrypt.hash(req.body.password, 10);

        const newUser = new User({
          username: req.body.username,
          password: hash,
        });

        newUser.save().then((user) => {
          res.status(201).json(user);
        });
      } catch {
        res.status(500).json({ message: "Something went wrong" });
      }
    }
  },
];

exports.login = async (req, res, next) => {
  User.findOne({ username: req.body.username }).then((user) => {
    if (!user) {
      return res
        .status(401)
        .json({ success: false, message: "User not found" });
    }

    bcrypt.compare(req.body.password, user.password, function (err, isValid) {
      if (err) {
        // handle error
        console.log(err);
      }
      if (isValid) {
        const tokenObject = utils.issueJWT(user);
        res.status(200).json({
          success: true,
          token: tokenObject.token,
          expiresIn: tokenObject.expires,
        });
      } else {
        return res.json({
          success: false,
          message: "passwords do not match",
        });
      }
    });
  });
};

exports.logout = (req, res) => {
  console.log("1");
};
