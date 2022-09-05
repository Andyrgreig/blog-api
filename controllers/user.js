const User = require("../models/user");
const bcrypt = require("bcrypt");
const passport = require("passport");
const jwt = require("../lib/jwt");

exports.getUser = (req, res) => {
  console.log("3");
};

exports.getAllUsers = (req, res) => {
  console.log("2");
};

exports.register = async (req, res) => {
  const hash = await bcrypt.hash(req.body.password, 10);

  const newUser = new User({
    username: req.body.username,
    password: hash,
    admin: req.body.admin,
  });

  newUser.save().then((user) => {
    res.status(201).json(user);
  });
};

exports.login = async (req, res) => {
  User.findOne({ username: req.body.username }).then((user) => {
    if (!user) {
      return res
        .status(401)
        .json({ success: false, message: "User not found" });
    }

    bcrypt.compare(req.body.password, user.password, function (err, isValid) {
      if (err) {
        throw err;
      }
      if (isValid) {
        const tokenObject = jwt.issueJWT(user);
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
  req.logout();
  res.json({ success: true, message: "Successfully logged out" });
};
