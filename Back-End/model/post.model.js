const mongoose = require("mongoose");

const postSchema = new mongoose.Schema(
  {
    title: String,
    image: String,
    brand: String,
    category: String,
    description: String,
    price: Number,
    saleprice: Number,
    totalstock: Number,
  },
  { timestamps: true }
);

const Post = mongoose.model("post", postSchema);
module.exports = Post;
