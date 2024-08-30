const express = require("express");
const cors = require("cors");

// import blog router
const blogRouter = require("./route/blog-route");

require("./db/db");

const app = express();

app.use(
  cors({
    origin: ["https://mern-blog-app-with-tailwind.vercel.app"],
    methods: ["POST", "GET"],
    credentials: true,
  })
);
app.use(express.json());

app.get("/", (req, res) => {
  res.json("Hello");
});

app.use("/api/blogs", blogRouter);
app.use("/api", (req, res) => {
  res.send("Hello");
});

app.listen(5000, () => console.log("Server Running at 5000"));
