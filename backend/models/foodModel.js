const mongoose = require("mongoose");

const foodSchema = new mongoose.Schema({
  productName: { type: String, required: true },
  sizesAndSKUs: { type: String, required: true },
  price: { type: Number, required: true },
  ingredients: { type: String, required: true },
  nutritionInfo: { type: String, required: true },
  description: { type: String, required: true },
  images: [String],
  isVegetarian: { type: Boolean, required: true },
});

const Food = mongoose.model("Food", foodSchema);

module.exports = Food;
