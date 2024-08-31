const express = require("express");
const cors = require("cors");
const blogRouter = require("./route/blog-route");
require("./db/db");

const app = express();

// CORS configuration
const corsOptions = {
  // SET ORIGIN TO FRONT END LANDING PAGE
  origin: "http://localhost:5173",
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true,
};

// Apply CORS middleware
app.use(cors(corsOptions));

// Handle preflight requests
app.options("*", cors(corsOptions));

// Middleware
app.use(express.json());

// Routes
app.get("/", (req, res) => {
  res.json("Hello");
});

app.get("/api/hello", (req, res) => {
  res.json("I CANTT FIXX THE BUGGGG");
});

app.use("/api/blogs", blogRouter);

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server Running on port ${PORT}`));
