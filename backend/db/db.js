const mongoose = require("mongoose");

mongoose.set("strictQuery", false);

mongoose
  .connect(
    "mongodb+srv://bontojohnadrian1:kc73yUKcGf4A@cluster0.g4dramb.mongodb.net/blogs"
  )
  .then(() => console.log("MongoDB Connected"))
  .catch((e) => console.log("Error: ", e.message));
