const express = require("express");
const cors = require("cors");

// Initialize express app
const app = express();

// Import blog router
const blogRouter = require("./route/blog-route");

// Database connection
require("./db/db");

// CORS configuration
const corsOptions = {
  origin:
    "https://mern-blog-app-with-tailwind-git-main-adrian9502s-projects.vercel.app", // Update this with the correct frontend origin
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true, // Allow credentials (cookies, authorization headers, etc.)
};

// Apply CORS middleware
app.use(cors(corsOptions));

// Other middleware
app.use(express.json());
app.options("*", cors(corsOptions));
// Routes
app.get("/", (req, res) => {
  res.json("Hello");
});

app.use("/api/blogs", blogRouter);
app.use("/api", (req, res) => {
  res.send("Hello");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server Running on port ${PORT}`));
