const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const path = require("path");
const { notFound, errorHandler } = require("./middlewares/errorMiddleware");
const connectDB = require("./config/db");
const uploadRoutes = require("./routes/uploadRoutes");
const userRouters = require("./routes/userRoutes");

dotenv.config();

connectDB();

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.use("/api/user", userRouters);
app.use("/api/uploads", uploadRoutes);

const dirname = path.resolve();
app.use("/uploads", express.static(path.join(dirname, "/uploads")));

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(dirname, "/client/build")));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(dirname, "client", "build", "index.html"));
  });
} else {
  app.get("/", (req, res) => {
    res.send("API is running");
  });
}

//Error middlewares
app.use(notFound);
app.use(errorHandler);

const port = 8000;
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
