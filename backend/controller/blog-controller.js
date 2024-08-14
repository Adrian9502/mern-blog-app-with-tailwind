const mongoose = require("mongoose");

const Blog = require("../model/Blog");

// fetch , CRUD in blog

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
};
