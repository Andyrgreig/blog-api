const mongoose = require("mongoose");

//Define a schema
const Schema = mongoose.Schema;

const PostSchema = new Schema({
  title: { type: String, required: true },
  text: { type: String, required: true },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  published: { type: Boolean, default: false },
  timestamp: { type: Date, default: Date.now() },
});

// Compile model from schema
module.exports = mongoose.model("Post", PostSchema);
