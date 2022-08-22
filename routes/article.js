const express = require("express");
const article = require("../controllers/article");

const router = express.Router();

// GET single article
router.get("/:id", article.getArticle);

// GET all posts
router.get("/", article.getAllArticles);

// POST new article
router.post("/", article.createArticle);

// PATCH article
router.patch("/:id", article.updateArticle);

// DELETE article
router.delete("/:id", article.deleteArticle);

module.exports = router;
