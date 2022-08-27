const jwt = require("jsonwebtoken");
require("dotenv").config();
const fs = require("fs");

const path = require("path");
const pathToPublicKey = path.join(__dirname, "..", "public_key");

const PRIVATE_KEY = process.env.PRIVATE_KEY.replace(/\\n/gm, "\n");
const PUBLIC_KEY = fs.readFileSync(pathToPublicKey, "utf8");

function issueJWT(user) {
  const _id = user._id;
  const admin = user.admin;
  const expiresIn = "7d";

  const payload = {
    sub: _id,
    admin: admin,
    iat: Date.now(),
  };

  const signedToken = jwt.sign(payload, PRIVATE_KEY, {
    expiresIn: expiresIn,
    algorithm: "RS256",
  });

  return {
    token: "Bearer " + signedToken,
    expires: expiresIn,
  };
}

exports.checkIsAdmin = async (req, res, next) => {
  try {
    let auth = req.headers.authorization;
    if (!auth) {
      req.isAdmin = false;
    } else {
      token = auth.split(" ")[1];
      jwt.verify(
        token,
        PUBLIC_KEY,
        { algorithms: ["RS256"] },
        (err, profile) => {
          if (err) return next(err);
          req.isAdmin = profile.admin;
          req.userId = profile.sub;
          next();
        }
      );
    }
  } catch (error) {
    next(error);
  }
};

module.exports.issueJWT = issueJWT;
