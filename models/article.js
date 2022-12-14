const mongoose = require("mongoose");
const { CommentSchema } = require("./comment");

//Define a schema
const Schema = mongoose.Schema;

const ArticleSchema = new Schema({
  title: { type: String, required: true },
  text: { type: String, required: true },
  image: String,
  // comments: [Comment.CommentSchema],
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  published: { type: Boolean, default: false },
  timestamp: { type: Date, default: Date.now() },
});

// Virtual for date
ArticleSchema.virtual("posted").get(function () {
  let posted = timestamp.format(this.timestamp, "DD MMM YYYY").toString();
  return posted;
});

// Compile model from schema
module.exports = mongoose.model("Article", ArticleSchema);
