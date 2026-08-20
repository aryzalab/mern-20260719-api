import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Product name is required."],
    minLength: 3,
    maxLength: 50,
  },
  brand: String,
  category: {
    type: String,
    required: [true, "Category is required."],
  },
  price: {
    type: Number,
    required: [true, "Price is required."],
    min: [1, "Price must be greater than 0."],
    max: [9999999, "Price must be less than 1 crore."],
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  stock: {
    type: Number,
    default: 1,
    min: 0,
  },
  description: String,
  imageUrls: [String],
  createdBy: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: true,
  },
});

export default mongoose.model("Product", productSchema);
