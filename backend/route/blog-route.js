const express = require("express");
const blogRouter = express.Router();

const {
  fetchListOfBlogs,
  addNewBlogs,
  updateBlog,
  deleteBlog,
} = require("../controller/blog-controller");

// get = display
// post = add new
// update = put
// delete = delete
blogRouter.get("/", fetchListOfBlogs);
blogRouter.post("/add", addNewBlogs);
blogRouter.put("/update/:id", updateBlog);
blogRouter.delete("/delete/:id", deleteBlog);

module.exports = blogRouter;
