const express = require("express");
const cors = require("cors");
const blogRouter = require("./route/blog-route");
require("./db/db");

const app = express();

// CORS configuration
const corsOptions = {
  origin: "*", // Update with the correct frontend origin
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true, // Allow credentials (cookies, authorization headers, etc.)
};

// Apply CORS middleware
app.use(cors(corsOptions));
app.options("*", cors(corsOptions)); // Handle preflight requests

// Middleware
app.use(express.json());

// Routes
app.get("/", (req, res) => {
  res.json("Hello");
});

app.use("/api/blogs", blogRouter);

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server Running on port ${PORT}`));
