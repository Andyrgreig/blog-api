const express = require("express");
const article = require("../controllers/article");
const passport = require("passport");

const router = express.Router();

// GET single article
router.get("/:id", article.GET_Article);

// GET all posts
router.get("/", article.GET_Articles);

// POST new article
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  article.POST_Article
);

// PATCH article
router.patch(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  article.PATCH_Article
);

// DELETE article
router.delete(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  article.DELETE_Article
);

module.exports = router;
