const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    category: { type: String, required: true },
    info: { type: String, required: true },
    size: { type: String, required: true },
    price: { type: Number, required: true },
    colors: { type: Object, required: false },
    image: { type: Object, required: false },

   
  },
  { timestamps: true }
);

const Product = mongoose.model("Product", productSchema);

exports.Product = Product;
