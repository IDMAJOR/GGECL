const AdminModel = require("../models/adminShema");
const BlogModel = require("../models/blogSchema");
const jwt = require("jsonwebtoken");

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
      return res.status(404).send({ message: "Post not found" });
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
      return res
        .status(404)
        .send({ message: "Could not find or Unable to delete Post" });
    }

    res.status(200).send({ message: "Post deleted successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: error });
  }
};

const createAdmin = async (req, res) => {
  const { authId, adminAuthId, username } = req.body;

  if (authId !== process.env.AUTH) {
    return res.status(403).send("No permission!");
  }

  try {
    const rAuth = await AdminModel.create({ adminAuthId, username });
    res.status(201).send("admin created");
  } catch (error) {
    res.status(500).send({ message: "admin creation failed", details: error });
  }
};

const signAdmin = async (req, res) => {
  const { adminAuthId } = req.body;

  const isAdmin = await AdminModel.findOne({ adminAuthId });

  if (!isAdmin) {
    return res.status(404).send("Wrong admin token");
  }

  const token = jwt.sign(
    { adminAuthId: isAdmin.adminAuthId },
    process.env.JWT_SECRET,
    {
      expiresIn: "30d",
    }
  );

  console.log(token);

  res.cookie("adminToken", token, {
    httpOnly: true,
    maxAge: 30 * 24 * 60 * 60 * 1000,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
  });

  res
    .status(200)
    .send({ token, message: "Admin verified", Admin: isAdmin.adminAuthId });
};

const checkAdmin = async (req, res) => {
  console.log(req.adminAuthId);
  try {
    const isAdmin = await AdminModel.findOne({ adminAuthId: req.adminAuthId });

    if (!isAdmin) {
      return res
        .status(403)
        .send({ message: "Unauthorized. Admin verification failed" });
    }

    res.status(200).send(req.adminAuthId);
  } catch (error) {
    console.log(error);
    res.status(500).send(req.adminAuthId);
  }
};

const searchUsers = async (req, res) => {
  const { query } = req.body;

  console.log("Search query received:", query);

  try {
    const searchQuery = new RegExp(query, "i");

    const posts = await BlogModel.find({
      $or: [
        { title: searchQuery },
        { excerpt: searchQuery },
        { category: searchQuery },
        { readingTime: searchQuery },
        { views: searchQuery },
        { author: searchQuery },
      ],
    });

    if (posts.length === 0) {
      return res.status(404).json({ message: "No results found" });
    }

    res.status(200).json({
      posts: posts.map((post) => ({ ...post.toObject(), id: post._id })),
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error searching blogs", error: error.message });
  }
};

module.exports = {
  getBlogPost,
  getSingleBlogPost,
  createBlogPost,
  updatePost,
  deletePost,
  createAdmin,
  checkAdmin,
  signAdmin,
  searchUsers,
};
