const express = require("express");
const cors = require("cors");

// import blog router
const blogRouter = require("./route/blog-route");

require("./db/db");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/blogs", blogRouter);
app.use("/api", (req, res) => {
  res.send("Hello");
});

app.listen(5000, () => console.log("Server Running at 5000"));
