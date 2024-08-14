import { useContext, useEffect } from "react";
import { GlobalContext } from "../context/GlobalState";
import classes from "./styleshome.module.css";
import { FaTrash, FaEdit } from "react-icons/fa";
import axios from "axios";
import { useNavigate } from "react-router-dom";
export default function Home() {
  const navigate = useNavigate();
  const { blogList, setBlogList, pending, setPending } =
    useContext(GlobalContext);

  async function fetchListOfBlogs() {
    setPending(true);
    try {
      const response = await axios.get("http://localhost:5000/api/blogs");
      const result = response.data;

      if (result && result.blogList) {
        if (result.blogList.length > 0) {
          setBlogList(result.blogList);
        } else {
          // Handle empty list case
          setBlogList([]);
        }
      } else {
        // Handle unexpected response format
        console.error("Unexpected response format:", result);
        setBlogList([]);
      }
    } catch (error) {
      console.error("fetchListOfBlogs error:", error);
      if (error.response) {
        console.error("Server responded with status:", error.response.status);
      } else if (error.request) {
        console.error("No response received:", error.request);
      } else {
        console.error("Error in setting up request:", error.message);
      }
      // Handle any other errors
      setBlogList([]);
    } finally {
      setPending(false);
    }
  }

  async function handleEditBlog(getCurrentItem) {
    console.log(getCurrentItem);
    navigate("/add-blog", { state: { getCurrentItem } });
  }

  async function handleDeleteBlog(getCurrentId) {
    /* 
    FROM backend/route/blog-route.js

    blogRouter.get("/", fetchListOfBlogs);
    blogRouter.post("/add", addNewBlogs);
    blogRouter.put("/update/:id", updateBlog);
    blogRouter.delete("/delete/:id", deleteBlog);
    */
    const response = await axios.delete(
      // this is from here blogRouter.delete("/delete/:id", deleteBlog);

      `http://localhost:5000/api/blogs/delete/${getCurrentId}`
    );
    const result = await response.data;
    if (result?.message) {
      console.log(result.message);
      fetchListOfBlogs();
    }
  }

  useEffect(() => {
    fetchListOfBlogs();
  }, []);
  return (
    <div className={classes.wrapper}>
      <h1>Blog List</h1>
      {pending ? (
        <h1>Loading Blogs...</h1>
      ) : (
        <div className={classes.blogList}>
          {blogList && blogList.length ? (
            blogList.map((blogItem) => (
              <div key={blogItem._id}>
                <p>{blogItem.title}</p>
                <p>{blogItem.description}</p>
                <FaEdit size={30} onClick={() => handleEditBlog(blogItem)} />
                <FaTrash
                  onClick={() => handleDeleteBlog(blogItem._id)}
                  size={30}
                />
              </div>
            ))
          ) : (
            <h3>No blogs added</h3>
          )}
        </div>
      )}
    </div>
  );
}
