const express = require("express");
const errorHandler = require("../middleware/errorhandler");
const { handleImageUpload, upload } = require("../helpers/claudinary");
const verifyToken = require("../middleware/verifyuser");
const Post = require("../model/post.model");

const productController = express.Router();

productController.post(
  "/upload-image",
  upload.single("my_file"),
  async (req, res, next) => {
    try {
      const b64 = Buffer.from(req.file.buffer).toString("base64");

      const url = `data:${req.file.mimetype};base64,${b64}`;
      const result = await handleImageUpload(url);

      res.status(200).json({
        message: "upload successfull",
        data: result,
        success: true,
        error: false,
      });
    } catch (error) {
      next(errorHandler(400, "error.message"));
    }
  }
);
productController.post("/create-post", verifyToken, async (req, res, next) => {
  try {
    if (!req.body) {
      return next(errorHandler(400, " post data are not found"));
    }
    const createPost = new Post(req.body);
    const newPost = await createPost.save();
    res.status(200).json({
      data: newPost,
      message: "post Create Successfully",
      success: true,
      error: false,
    });
  } catch (error) {
    console.log(error);
    return next(errorHandler(400, error.message));
  }
});
productController.get("/getallpost", async (req, res, next) => {
  try {
    const post = await Post.find().sort({ createdAt: -1 });
    res.status(200).json({
      message: "get post",
      data: post,
      success: true,
      error: false,
    });
  } catch (error) {
    console.log(error);
    return next(errorHandler(400, "internal server error"));
  }
});
productController.get("/getallshopost", async (req, res, next) => {
  try {
    const { category = [], brand = [], sortBy = "price-lowtohigh" } = req.query;

    let filters = {};

    if (category.length) {
      filters.category = { $in: category.split(",") };
    }

    if (brand.length) {
      filters.brand = { $in: brand.split(",") };
    }

    let sort = {};

    switch (sortBy) {
      case "price-lowtohigh":
        sort.price = 1;

        break;
      case "price-hightolow":
        sort.price = -1;

        break;
      case "title-atoz":
        sort.title = 1;

        break;

      case "title-ztoa":
        sort.title = -1;

        break;

      default:
        sort.price = 1;
        break;
    }

    const products = await Post.find(filters).sort(sort);

    res.status(200).json({
      success: true,
      data: products,
    });
  } catch (error) {
    console.log(error);
    return next(errorHandler(400, "internal server error"));
  }
});
productController.get("/getbookbyid/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const findpost = await Post.findById(id);

    if (!findpost) {
      return next(errorHandler(400, "post not found"));
    }

    res.status(200).json({
      message: "post found successfully",
      blog: findpost,
      success: true,
      error: false,
    });
  } catch (error) {
    console.log(error);
    return next(errorHandler(400, error.message));
  }
});
productController.patch("/updatebpost/:id", async (req, res, next) => {
  try {
    const { id } = req.params;

    const update = await Post.findByIdAndUpdate(id, req.body, { new: true });
    res.status(200).json({
      updateblog: update,
      success: true,
      error: false,
    });
  } catch (error) {
    console.log(error);
    next(errorHandler(400, error.message));
  }
});
productController.delete("/deletepost/:id", async (req, res, next) => {
  const { id } = req.params;

  try {
    const deletepost = await Post.findByIdAndDelete(id);

    res.status(200).json({
      deletepost: deletepost,
      message: "successfully delete",
      success: true,

      error: false,
    });
  } catch (error) {
    console.log(error);
    return next(errorHandler());
  }
});

module.exports = productController;
