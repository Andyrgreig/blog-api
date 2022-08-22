const express = require("express");
const comment = require("../controllers/comment");

const router = express.Router();

// GET single comment
router.get("/:id", comment.getComment);

// GET all posts
router.get("/", comment.getAllComments);

// POST new comment
router.post("/", comment.createComment);

// PATCH comment
router.patch("/:id", comment.updateComment);

// DELETE comment
router.delete("/:id", comment.deleteComment);

module.exports = router;
