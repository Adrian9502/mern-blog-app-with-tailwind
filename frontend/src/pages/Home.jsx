import { useContext, useEffect } from "react";
import { GlobalContext } from "../context/GlobalState";
import { FaTrash, FaEdit } from "react-icons/fa";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ThreeDots } from "react-loader-spinner";
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
    <div className="min-h-[80vh] pt-20 px-4">
      <h1 className="text-3xl font-bold text-center text-white mb-6">
        Blog List
      </h1>
      {pending ? (
        <div className="min-h-[60vh] flex items-center justify-center">
          <ThreeDots
            visible={true}
            height="80"
            width="80"
            color="#10b981"
            radius="9"
            ariaLabel="three-dots-loading"
            wrapperStyle={{}}
            wrapperClass=""
          />
        </div>
      ) : (
        <div className="p-4 grid gap-4 grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {blogList && blogList.length ? (
            blogList.map((blogItem) => (
              <div
                className="shadow-2xl rounded-lg border border-gray-200 overflow-auto max-h-[376px]"
                key={blogItem._id}
              >
                <div className="p-4 h-full">
                  <h2 className="text-2xl py-2 text-white text-center font-semibold">
                    {blogItem.title}
                  </h2>
                  <p className="text-gray-200 my-1">{blogItem.description}</p>
                  <div className="flex justify-center items-center space-x-7 p-4">
                    <button
                      onClick={() => handleEditBlog(blogItem)}
                      className="text-white transition flex items-center justify-center px-4 py-2 border-2 border-emerald-700 rounded-lg space-x-2 hover:bg-emerald-500 hover:text-gray-900 hover:border-transparent"
                    >
                      <FaEdit size={30} />
                      <span className="font-semibold">Edit</span>
                    </button>
                    <button
                      onClick={() => handleDeleteBlog(blogItem._id)}
                      className="text-white transition flex items-center justify-center px-4 py-2 border-2 border-emerald-700 rounded-lg space-x-2 hover:bg-emerald-500 hover:text-gray-900 hover:border-transparent"
                    >
                      <FaTrash size={30} />
                      <span className="font-semibold">Delete</span>
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="min-h-[60vh] flex items-center justify-center text-center text-lg text-slate-100 italic">
              No blogs added
            </div>
          )}
        </div>
      )}
    </div>
  );
}
