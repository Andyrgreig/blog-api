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
  article: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Article",
    required: true,
  },
  timestamp: { type: Date, default: Date.now() },
});

exports.Comment = mongoose.model("Comment", CommentSchema);
exports.CommentSchema = CommentSchema;
