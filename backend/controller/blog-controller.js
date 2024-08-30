const mongoose = require("mongoose");

const Blog = require("../model/Blog");

// CREATE
const addNewBlogs = async (req, res) => {
  const { title, description } = req.body;
  const currentDate = new Date();
  const newlyCreatedBlog = new Blog({ title, description, date: currentDate });

  try {
    await newlyCreatedBlog.save();
    return res.status(200).json({ newlyCreatedBlog });
  } catch (e) {
    console.log("addNewBlogs Error:", e);
    return res.status(500).json({ message: "Error creating blog." });
  }
};
// READ
const fetchListOfBlogs = async (req, res) => {
  console.log("Starting fetchListOfBlogs at", new Date());
  try {
    console.log("Fetching blogs from the database...");
    const blogList = await Blog.find().limit(50); // Limit results for faster response
    console.log("Fetched blogs at", new Date(), "Count:", blogList.length);
    if (blogList.length === 0) {
      return res.status(404).json({ message: "No blogs found." });
    }
    return res.status(200).json({ blogList });
  } catch (e) {
    console.error("fetchListOfBlogs Error at", new Date(), e);
    return res.status(500).json({ message: "Error fetching blogs." });
  }
};

// UPDATE
const updateBlog = async (req, res) => {
  const id = req.params.id;
  const { title, description } = req.body;

  try {
    const updatedBlog = await Blog.findByIdAndUpdate(
      id,
      { title, description },
      { new: true } // This option returns the updated document
    );

    if (!updatedBlog) {
      return res.status(404).json({ message: "Blog not found." });
    }

    return res.status(200).json({ updatedBlog });
  } catch (e) {
    console.log("updateBlog Error:", e);
    return res.status(500).json({ message: "Error updating blog." });
  }
};

// DELETE
const deleteBlog = async (req, res) => {
  const id = req.params.id;

  try {
    const deletedBlog = await Blog.findByIdAndDelete(id);

    if (!deletedBlog) {
      return res
        .status(404)
        .json({ message: "Blog not found. Cannot delete." });
    }

    return res.status(200).json({ message: "Deleted successfully!" });
  } catch (e) {
    console.log("deleteBlog Error:", e);
    return res.status(500).json({ message: "Error deleting blog." });
  }
};

// export CRUD functions
module.exports = { fetchListOfBlogs, deleteBlog, updateBlog, addNewBlogs };
