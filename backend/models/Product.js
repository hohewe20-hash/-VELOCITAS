const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  brand: {
    type: String,
    required: true
  },
  model: {
    type: String,
    required: true
  },
  year: {
    type: Number,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  description: {
    type: String
  },
  images: {
    type: [String]
  },
  specs: {
    engine: String,
    horsepower: Number,
    torque: Number,
    transmission: String,
    topSpeed: Number,
    acceleration: String
  },
  category: {
    type: String,
    enum: ["SUV", "Sedan", "Sports", "Coupe", "Convertible"],
    default: "Sports"
  },
  inStock: {
    type: Boolean,
    default: true
  }
}, { timestamps: true });

module.exports = mongoose.model("Product", ProductSchema);