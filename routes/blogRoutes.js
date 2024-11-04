const express = require("express");
const {
  getBlogPost,
  getSingleBlogPost,
  createBlogPost,
  updatePost,
  deletePost,
} = require("../controller/blogControllers");

const router = express.Router();

router.route("/get-posts").get(getBlogPost);
router.route("/get-single-post/:contentId").get(getSingleBlogPost);
router.route("/create-posts").post(createBlogPost);
router.route("/update").post(updatePost);
router.route("/delete/:contentId").get(deletePost);

module.exports = router;
