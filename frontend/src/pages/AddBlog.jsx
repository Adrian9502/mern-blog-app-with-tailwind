import { useContext } from "react";
import classes from "./styles.module.css";
import { GlobalContext } from "../context/GlobalState";
import axios from "axios";
import { useNavigate } from "react-router-dom";
export default function AddBlog() {
  const { formData, setFormData } = useContext(GlobalContext);
  const navigate = useNavigate();

  // handle saving to database
  async function handleSaveToDatabase() {
    const response = await axios.post("http://localhost:5000/api/blogs/add", {
      title: formData.title,
      description: formData.description,
    });

    const result = await response.data;

    if (result) {
      setFormData({ title: "", description: "" });
      navigate("/");
    }
  }
  return (
    <div className={classes.wrapper}>
      <h1>AddBlog</h1>
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
        <button onClick={handleSaveToDatabase}>Add New Blog</button>
      </div>
    </div>
  );
}
