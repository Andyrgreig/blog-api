const jsonwebtoken = require("jsonwebtoken");
require("dotenv").config();
// const path = require("path");
// const pathToKey = path.join(__dirname, "public_key");
const PRIVATE_KEY = process.env.PRIVATE_KEY.replace(/\\n/gm, "\n");

function issueJWT(user) {
  const _id = user._id;
  const expiresIn = "7d";

  const payload = {
    sub: _id,
    iat: Date.now(),
  };

  const signedToken = jsonwebtoken.sign(payload, PRIVATE_KEY, {
    expiresIn: expiresIn,
    algorithm: "RS256",
  });

  return {
    token: "Bearer " + signedToken,
    expires: expiresIn,
  };
}

module.exports.issueJWT = issueJWT;
