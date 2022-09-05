const Article = require("../models/article");
const { validationResult, body } = require("express-validator");

exports.GET_article = (req, res) => {
  Article.findById(req.params.articleId)
    .populate("author")
    .exec((err, article) => {
      if (err) return next(err);

      if (article.published || req.isAdmin) {
        return res.status(200).json({ article });
      } else {
        return res
          .status(200)
          .json({ success: true, message: "Article not found" });
      }
    });
};

exports.GET_articles = (req, res) => {
  let searchArray = [true];

  if (req.isAdmin) {
    searchArray.push(false);
  }
  Article.find({ published: { $in: searchArray } })
    .populate("author")
    .exec((err, articles) => {
      if (err) {
        return next(err);
      }
      res.status(200).json(articles);
    });
};

exports.POST_article = (req, res, next) => {
  if (!req.isAdmin) {
    return res.status(401).json({
      success: true,
      message: "You are not authorised to perform this action.",
    });
  } else {
    const article = new Article({
      title: req.body.title,
      text: req.body.text,
      image: req.body.image,
      author: req.userId,
    });

    article.save((err, article) => {
      if (err) return next(err);

      console.log("article saved");
      res.status(201).json({ success: true, message: "Article posted" });
    });
  }
};

exports.PATCH_article = (req, res, next) => {
  if (!req.isAdmin) {
    return res.status(401).json({
      success: true,
      message: "You are not authorised to perform this action.",
    });
  }
  const updates = {
    title: req.body.title,
    body: req.body.text,
    image: req.body.image,
  };

  Article.findByIdAndUpdate(req.params.articleId, updates).exec((err) => {
    if (err) return next(err);
    res.status(200).json({ success: true, message: "Article updated" });
  });
};

exports.DELETE_article = (req, res) => {
  if (!req.isAdmin) {
    return res.status(401).json({
      success: true,
      message: "You are not authorised to perform this action.",
    });
  }
  Article.findByIdAndDelete(req.params.articleId, (err) => {
    if (err) return next(err);
    res.status(200).json({ success: true, message: "Article deleted" });
  });
};
