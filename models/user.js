const mongoose = require("mongoose");

//Define a schema
const Schema = mongoose.Schema;

const UserSchema = new mongoose.Schema({
  username: String,
  password: String,
  admin: Boolean,
});

// Compile model from schema
module.exports = mongoose.model("User", UserSchema);
