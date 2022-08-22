const mongoose = require("mongoose");

//Define a schema
const Schema = mongoose.Schema;

const CommentSchema = new Schema({
  text: { type: String, required: true },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  postId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Post",
    required: true,
  },
  timestamp: { type: Date, default: Date.now() },
});

// Compile model from schema
module.exports = mongoose.model("Comment", CommentSchema);
