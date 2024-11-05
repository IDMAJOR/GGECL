const express = require("express");
const verifyAdmin = require("../middlewares/verifyAdmin");
const router = express.Router();
const {
  getBlogPost,
  getSingleBlogPost,
  createBlogPost,
  updatePost,
  deletePost,
  createAdmin,
  checkAdmin,
  signAdmin,
} = require("../controller/blogControllers");

router.route("/get-posts").get(getBlogPost);
router.route("/get-single-post/:contentId").get(getSingleBlogPost);
router
  .route("/jdy72ensox73y83o2737173nxy437475y7442374y8/:authId")
  .post(createAdmin);
router.get("/check-admin", verifyAdmin, checkAdmin);
router.post("/sign-admin", signAdmin);
router.post("/create-posts", verifyAdmin, createBlogPost);
router.put("/update", verifyAdmin, updatePost);
router.delete("/delete/:contentId", verifyAdmin, deletePost);

module.exports = router;
