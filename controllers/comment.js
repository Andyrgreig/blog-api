const Article = require("../models/article");
const { Comment } = require("../models/comment");
const { validationResult, body } = require("express-validator");
const article = require("../models/article");

exports.GET_comment = (req, res) => {
  Comment.findOne({ "comments._id": req.params.commentId })
    .populate("author")
    .exec((err, comment) => {
      if (err) return next(err);
      if (comment) {
        return res.status(200).json({ comment });
      } else {
        return res
          .status(200)
          .json({ success: true, message: "Comment not found" });
      }
    });
};

exports.GET_all_comments = (req, res) => {
  Comment.find({ article: req.params.articleId })
    .populate("author")
    .sort({ timestamp: 1 })
    .exec((err, comments) => {
      if (err) return next(err);
      if (comments) {
        return res.status(200).json({ comments });
      } else {
        return res
          .status(200)
          .json({ success: true, message: "Comments not found" });
      }
    });
};

exports.POST_comment = (req, res, next) => {
  if (!req.userId) {
    return res.status(403).json({ success: false, message: "Please log in" });
  } else {
    const comment = new Comment({
      text: req.body.text,
      author: req.userId,
      article: req.params.articleId,
    });

    comment.save((err) => {
      if (err) return next(err);
      res.status(201).json({ success: true, message: "Comment posted" });
    });
  }
};

exports.PATCH_comment = (req, res) => {
  Comment.findById(req.params.commentId).exec((err, comment) => {
    if (err) return next(err);
    if (req.isAdmin || req.userId === comment.author) {
      const update = req.body.text;
      Comment.findByIdAndUpdate(req.params.commentd, update).exec((err) => {
        if (err) return next(err);
        res.status(200).json({ success: true, message: "Comment updated" });
      });
    } else {
      return res.status(401).json({
        success: true,
        message: "You are not authorised to perform this action.",
      });
    }
  });
};

exports.DELETE_comment = (req, res) => {
  Comment.findById(req.params.commentId).exec((err, comment) => {
    if (err) return next(err);
    if (req.isAdmin || req.userId === comment.author) {
      Comment.deleteOne({ _id: req.params.commentId });
    } else {
      return res.status(401).json({
        success: true,
        message: "You are not authorised to perform this action.",
      });
    }
  });
};
