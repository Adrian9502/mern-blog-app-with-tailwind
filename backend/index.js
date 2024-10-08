const express = require("express");
const cors = require("cors");
const blogRouter = require("./route/blog-route");
require("./db/db");

const app = express();

// CORS configuration
// const corsOptions = {
//   // SET ORIGIN TO FRONT END LANDING PAGE
//   origin: "https://mern-blog-app-with-tailwind-frontend.vercel.app",
//   methods: ["GET", "POST", "PUT", "DELETE"],
//   credentials: true,
// };

const allowedOrigins = [
  "https://mern-blog-app-with-tailwind-frontend.vercel.app",
  "http://localhost:5173",
];

const corsOptions = {
  origin: function (origin, callback) {
    if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
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
