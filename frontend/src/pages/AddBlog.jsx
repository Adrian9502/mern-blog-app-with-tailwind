import { useContext, useEffect } from "react";
import classes from "./styles.module.css";
import { GlobalContext } from "../context/GlobalState";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
export default function AddBlog() {
  const { formData, setFormData, setIsEdit, isEdit } =
    useContext(GlobalContext);
  const navigate = useNavigate();
  const location = useLocation();

  // handle saving to database
  async function handleSaveToDatabase() {
    const response = isEdit
      ? await axios.put(
          `http://localhost:5000/api/blogs/update/${location.state.getCurrentItem._id}`,
          { title: formData.title, description: formData.description }
        )
      : await axios.post("http://localhost:5000/api/blogs/add", {
          title: formData.title,
          description: formData.description,
        });

    const result = await response.data;

    if (result) {
      setIsEdit(false);
      setFormData({ title: "", description: "" });
      navigate("/");
    }
  }

  useEffect(() => {
    console.log(location);
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
    <div className={classes.wrapper}>
      <h1>{isEdit ? "Edit a Blog" : "Add a Blog"}</h1>
      <div className={classes.formWrapper}>
        <input
          type="text"
          name="title"
          placeholder="Enter blog title..."
          id="title"
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
        />
        <textarea
          name="description"
          id="description"
          placeholder="enter blog description"
          value={formData.description}
          onChange={(e) =>
            setFormData({ ...formData, description: e.target.value })
          }
        ></textarea>
        <button onClick={handleSaveToDatabase}>
          {isEdit ? "Edit a Blog" : "Add a Blog"}
        </button>
      </div>
    </div>
  );
}
