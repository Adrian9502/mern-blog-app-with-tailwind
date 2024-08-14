const express = require("express");
const cors = require("cors");

require("./db");

const app = express();

app.use(cors());
app.use(express.json());
app.use("/api", (req, res) => {
  res.send("Hello");
});

app.listen(5000, () => console.log("Server Running at 5000"));
