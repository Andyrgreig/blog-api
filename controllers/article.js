const Article = require("../models/article");
const { validationResult, body } = require("express-validator");

exports.GET_Article = (req, res, next) => {
  // Add logic to account for whether article is published or not
  Article.findById(req.params.id)
    .populate("author")
    .exec((err, article) => {
      if (err) return next(err);
      res.status(200).json({ article });
    });
};

exports.GET_Articles = (req, res, next) => {
  // Add logic to account for whether articles are published or not
  Article.find()
    .populate("author")
    .exec((err, articles) => {
      if (err) return next(err);
      res.status(200).json({ articles });
    });
};

exports.POST_Article = [
  body("title")
    .isLength({ min: 3 })
    .trim()
    .escape()
    .withMessage("Title must be at least 3 characters"),
  body("text")
    .isLength({ min: 20 })
    .trim()
    .escape()
    .withMessage("Text must be at least 20 characters"),

  (req, res, next) => {
    if (!req.user.admin) {
      return res.status(401).json({
        success: true,
        message: "You are not authorised to perform this action.",
      });
    }

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const article = new Article({
      title: req.body.title,
      text: req.body.text,
      author: req.user._id,
    });

    article.save().then((err, article) => {
      if (err) return next(err);
      res.status(201).json(article);
    });
  },
];

exports.PATCH_Article = [
  body("title")
    .isLength({ min: 3 })
    .trim()
    .escape()
    .withMessage("Title must be at least 3 characters"),
  body("text")
    .isLength({ min: 20 })
    .trim()
    .escape()
    .withMessage("Text must be at least 20 characters"),

  (req, res) => {
    if (!req.user.admin) {
      return res.status(401).json({
        success: true,
        message: "You are not authorised to perform this action.",
      });
    }
    const errors = validationResult(req);

    const updates = {
      title: req.body.title,
      body: req.body.text,
    };

    if (!errors.isEmpty()) {
      res.status(400).json({ message: errors });
    } else {
      Article.findByIdAndUpdate(req.params.id, updates)
        .then(() => {
          res.status(200).json({ success: true, message: updates });
        })
        .catch((err) => {
          res.status(400).json({ success: false, message: errors });
        });
    }
  },
];

exports.DELETE_Article = (req, res) => {
  if (!req.user.admin) {
    return res.status(401).json({
      success: true,
      message: "You are not authorised to perform this action.",
    });
  }
  Article.findByIdAndDelete(req.params.id, (err, article) => {
    if (err) {
      res.status(400).json({ success: false, message: errors });
    } else {
      res.status(200).json({ success: true, message: "Article deleted" });
    }
  });
};
