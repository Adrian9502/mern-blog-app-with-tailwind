const express = require("express");
const cors = require("cors");

// Import blog router
const blogRouter = require("./route/blog-route");

require("./db/db");

const app = express();

app.use(
  cors({
    origin: "https://mern-blog-app-with-tailwind.vercel.app", // Allow only your frontend domain
    methods: ["GET", "POST", "PUT", "DELETE"], // Allow methods you use
    credentials: true, // If you're sending cookies or authorization headers
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

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server Running on port ${PORT}`));
