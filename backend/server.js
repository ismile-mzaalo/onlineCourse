const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const path = require("path");
const multer = require("multer");
const { notFound, errorHandler } = require("./middlewares/errorMiddleware");
const connectDB = require("./config/db");
const Food = require("./models/foodModel");

dotenv.config();

connectDB();

const app = express();
const upload = multer({ dest: "uploads/" });

app.use(cors());
app.use(bodyParser.json());

app.post("/api/food", async (req, res) => {
  try {
    const product = new Food({
      productName: req.body.productName,
      sizesAndSKUs: req.body.sizesAndSKUs,
      price: req.body.price,
      ingredients: req.body.ingredients,
      nutritionInfo: req.body.nutritionInfo,
      description: req.body.description,
      isVegetarian: req.body.isVegetarian,
    });

    await product.save();
    res.status(201).json({ message: "Food added successfully", product });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Something went wrong", error: err.message });
  }
});

app.put("/api/food/:id", upload.array("images", 5), async (req, res) => {
  try {
    const food = await Food.findById(req.params.id);

    const images = await req.files.map((file) => file.path);

    food.images = images;

    const updatedImage = await food.save();

    res.json(updatedImage);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Something went wrong", error: err.message });
  }
});

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "/client/build")));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
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
