const express = require("express");
const article = require("../controllers/article");

const router = express.Router();

// GET single article
router.get("/:id", article.GET_Article);

// GET all posts
router.get("/", article.GET_Articles);

// POST new article
router.post("/", article.POST_Article);

// PATCH article
router.patch("/:id", article.PATCH_Article);

// DELETE article
router.delete("/:id", article.DELETE_Article);

module.exports = router;
