const BlogModel = require("../models/blogSchema");

const getBlogPost = async (req, res) => {
  try {
    const blogs = await BlogModel.find({});

    if (!blogs) {
      res
        .status(205)
        .send({ message: `You haven't created any Blog Post yet` });
    }

    res.status(200).send(blogs);
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: error });
  }
};

const getSingleBlogPost = async (req, res) => {
  const { contentId } = req.params;

  try {
    const blog = await BlogModel.findById(contentId);

    if (!blog) {
      return res.status(404).send({ message: "Blog content doesn't exist" });
    }

    res.status(200).send(blog);
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: error });
  }
};

const createBlogPost = async (req, res) => {
  const {
    title,
    excerpt,
    image,
    content,
    category,
    readingTime,
    views,
    comments,
    author,
  } = req.body;

  try {
    const blogPost = await BlogModel.create({
      title,
      excerpt,
      image,
      content,
      category,
      readingTime,
      views,
      comments,
      author,
    });
    res.status(201).send(blogPost);
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: error });
  }
};

const updatePost = async (req, res) => {
  const {
    title,
    excerpt,
    image,
    content,
    category,
    readingTime,
    views,
    comments,
    author,
    contentId,
  } = req.body;

  try {
    const postUpdate = await BlogModel.findByIdAndUpdate(
      contentId,
      {
        title,
        excerpt,
        image,
        content,
        category,
        readingTime,
        views,
        comments,
        author,
      },
      { new: true, runValidators: true }
    );

    if (!postUpdate) {
      res.status(404).send({ message: "Post not found" });
    }

    res.status(202).send(postUpdate);
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: error });
  }
};

const deletePost = async (req, res) => {
  const { contentId } = req.params;

  try {
    const deleteP = await BlogModel.findByIdAndDelete(contentId);

    if (!deleteP) {
      res
        .status(404)
        .send({ message: "Could not find or Unable to delete Post" });
    }

    res.status(200).send({ message: "Post deleted successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: error });
  }
};
module.exports = {
  getBlogPost,
  getSingleBlogPost,
  createBlogPost,
  updatePost,
  deletePost,
};
