const mongoose = require("mongoose");

const Blog = require("../model/Blog");

// CREATE
const addNewBlogs = async (req, res) => {
  const { title, description } = req.body;
  const currentDate = new Date();
  // model
  const newlyCreatedBlog = new Blog({ title, description, date: currentDate });

  try {
    await newlyCreatedBlog.save();
  } catch (e) {
    console.log("addNewBlogs Error :", e);
  }

  try {
    const session = await mongoose.startSession();

    session.startTransaction();

    await newlyCreatedBlog.save(session);
    session.commitTransaction();
  } catch (e) {
    return res.send(500).json({ message: e });
  }

  return res.status(200).json({ newlyCreatedBlog });
};
// READ
const fetchListOfBlogs = async (req, res) => {
  let blogList;

  try {
    blogList = await Blog.find();
  } catch (e) {
    console.log("fetch error:", e);
  }

  if (!blogList) return res.status(404).json({ message: "No Blogs found" });

  return res.status(200).json({ blogList });
};
// UPDATE
const updateBlog = async (req, res) => {
  const id = req.params.id;
  const { title, description } = req.body;
  let currentBlogToUpdate;
  try {
    currentBlogToUpdate = await Blog.findByIdAndUpdate(id, {
      title,
      description,
    });
  } catch (e) {
    console.log("updateBlog Error:", e);
    return res.send(500).json({ message: "Error updating blog." });
  }

  if (!currentBlogToUpdate) {
    return res.status(500).json({ message: "Unable to update" });
  }

  return res.send(200).json({ currentBlogToUpdate });
};
// DELETE
const deleteBlog = async (req, res) => {
  const id = req.params.id;

  try {
    const findCurrentBlog = await Blog.findByIdAndDelete(id);
    if (!findCurrentBlog) {
      return res.status(404).json({ message: "Blog not found. Cannot delete" });
    }
    return res.status(200).json({ message: "Deleted Successfully!" });
  } catch (e) {
    console.log("deleteBlog Error:", e);
    return res.status(500).json({ message: "Unable to delete blog" });
  }
};

// export CRUD functions
module.exports = { fetchListOfBlogs, deleteBlog, updateBlog, addNewBlogs };
