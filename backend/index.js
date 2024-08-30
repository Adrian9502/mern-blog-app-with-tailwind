const express = require("express");
const cors = require("cors");

// Import blog router
const blogRouter = require("./route/blog-route");

require("./db/db");

const app = express();

app.options("*", cors());
app.use(express.json());

const corsOptions = {
  origin: "https://mern-blog-app-with-tailwind.vercel.app/api/blogs",
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true, // Allow credentials (cookies, authorization headers, etc.)
};

app.use(cors(corsOptions));
app.get("/", (req, res) => {
  res.json("Hello");
});

app.use("/api/blogs", blogRouter);
app.use("/api", (req, res) => {
  res.send("Hello");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server Running on port ${PORT}`));
