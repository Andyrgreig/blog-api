const mongoose = require("mongoose");
const Comment = require("comment");

//Define a schema
const Schema = mongoose.Schema;

const PostSchema = new Schema({
  title: { type: String, required: true },
  text: { type: String, required: true },
  comments: [Comment],
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
