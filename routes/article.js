const express = require("express");
const article = require("../controllers/article");
const comment = require("../controllers/comment");
const jwt = require("../lib/jwt");
const { validateArticle } = require("../lib/validator");

const router = express.Router();

/**
 *
 *      ARTICLE ROUTES
 **/

// GET single article
router.get("/:articleId", jwt.checkIsAdmin, article.GET_article);

// GET all articles
router.get("/", jwt.checkIsAdmin, article.GET_articles);

// DELETE article
router.delete("/:articleId", jwt.checkIsAdmin, article.DELETE_article);

// POST new article
router.post("/", jwt.checkIsAdmin, validateArticle, article.POST_article);

// PATCH article
router.patch(
  "/:articleId",
  jwt.checkIsAdmin,
  validateArticle,
  article.PATCH_article
);

/**
 *
 *      COMMENT ROUTES
 **/

// GET all comments for an article
router.get("/:articleId/comments", comment.GET_all_comments);

// GET single comment
router.get("/:articleId/comments/:commentId", comment.GET_comment);

// DELETE comment
router.delete(
  "/:articleId/comments/:commentId",
  jwt.checkIsAdmin,
  comment.DELETE_comment
);

// POST new comment
router.post("/:articleId/comments/", jwt.checkIsAdmin, comment.POST_comment);

// PATCH comment
router.patch(
  "/:articleId/comments/:commentId",
  jwt.checkIsAdmin,
  comment.PATCH_comment
);

/**
 *      export router
 **/

module.exports = router;
