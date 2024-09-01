import { useContext, useEffect } from "react";
import { GlobalContext } from "../context/GlobalState";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
export default function AddBlog() {
  axios.defaults.withCredentials = true;
  const { formData, setFormData, setIsEdit, isEdit } =
    useContext(GlobalContext);
  const navigate = useNavigate();
  const location = useLocation();

  // handle saving to database
  // async function handleSaveToDatabase() {
  //   const response = isEdit
  //     ? await axios.put(
  //         // CHANGE THIS TO SERVER API !!!!
  //         `https://mern-blog-app-with-tailwind-api.vercel.app/${location.state.getCurrentItem._id}`,
  //         { title: formData.title, description: formData.description }
  //       )
  //     : await axios.post(
  //         "https://mern-blog-app-with-tailwind-api.vercel.app/api/blogs/add",
  //         {
  //           title: formData.title,
  //           description: formData.description,
  //         }
  //       );

  //   const result = await response.data;

  //   if (result) {
  //     setIsEdit(false);
  //     setFormData({ title: "", description: "" });
  //     navigate("/");
  //   }
  // }
  async function handleSaveToDatabase() {
    const response = isEdit
      ? await axios.put(
          // Correct URL with the update path
          `https://mern-blog-app-with-tailwind-api.vercel.app/api/blogs/update/${location.state.getCurrentItem._id}`,
          { title: formData.title, description: formData.description }
        )
      : await axios.post(
          "https://mern-blog-app-with-tailwind-api.vercel.app/api/blogs/add",
          {
            title: formData.title,
            description: formData.description,
          }
        );

    const result = await response.data;

    if (result) {
      setIsEdit(false);
      setFormData({ title: "", description: "" });
      navigate("/");
    }
  }

  useEffect(() => {
    if (location.state) {
      const { getCurrentItem } = location.state;
      setIsEdit(true);
      setFormData({
        title: getCurrentItem.title,
        description: getCurrentItem.description,
      });
    }
  }, [location]);
  return (
    <div className="bg-slate-900 min-h-[90vh] flex items-center justify-center p-6">
      <div className="w-full max-w-lg bg-white rounded-lg shadow-lg p-8">
        <h1 className="text-3xl font-bold mb-6 text-gray-800 text-center">
          {isEdit ? "Edit Blog" : "Add Blog"}
        </h1>
        <form className="space-y-4">
          <div>
            <label
              htmlFor="title"
              className="block text-sm font-medium text-gray-700"
            >
              Blog Title
            </label>
            <input
              type="text"
              name="title"
              id="title"
              placeholder="Enter blog title"
              value={formData.title}
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
              className="mt-1 block w-full px-3 py-2 border border-gray-400 rounded-md shadow-sm focus:outline-none focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm"
            />
          </div>
          <div>
            <label
              htmlFor="description"
              className="block text-sm font-medium text-gray-700"
            >
              Blog Description
            </label>
            <textarea
              name="description"
              id="description"
              placeholder="Enter blog description"
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
              className="mt-1 block resize-none w-full px-3 py-2 border border-gray-400 rounded-md shadow-sm focus:outline-none focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm"
              rows="6"
            ></textarea>
          </div>
          <div className="flex justify-center">
            <button
              type="button"
              onClick={handleSaveToDatabase}
              className="text-white font-semibold bg-slate-900 transition flex items-center justify-center px-4 py-2 rounded-lg space-x-2 hover:bg-emerald-500 hover:text-black hover:border-transparent"
            >
              {isEdit ? "Update Blog" : "Add Blog"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
