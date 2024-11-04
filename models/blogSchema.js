const mongoose = require("mongoose");

const BlogSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    excerpt: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    readingTime: {
      type: String,
      required: true,
    },
    readingTime: {
      type: String,
      required: true,
    },
    views: {
      type: String,
    },
    comments: {
      type: String,
    },
    author: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true, // Adds createdAt and updatedAt fields
  }
);

const BlogModel = mongoose.model("Blog_Posts", BlogSchema);

module.exports = BlogModel;
