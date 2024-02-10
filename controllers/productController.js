const express = require("express");
const Product = require("../models/productModel");
const userModel = require("../models/userModel");
const asyncHandler = require("express-async-handler");
const app = express();
app.use(express.json()); // Add this line to parse JSON request bodies

// admin can get all product list
const getAllProducts = asyncHandler(async (req, res) => {
  const products = await Product.find();
  res.status(200).json(products);
});

const getProduct = async (req, res) => {
  //console.log("body data", req.body);
  const products = await Product.find({ user: req.user.id });
  res.status(200).json({ products });
};

const createProduct = async (req, res) => {
  // if (!req.body.title) {
  //   res.status(400).json({ error: "please add title" });
  // }
  // if (!req.body.description) {
  //   res.status(400).json({ error: "please add description" });
  // }
  const products = await Product.create({
    user: req.user.id,
    title: req.body.title,
    description: req.body.description,
  });
  res.status(200).json({ products });
};

const updateProduct = async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (!product) {
    res.status(400).json({ error: "Product not found" });
  }
  // only authorized user can update the products list
  const user = await userModel.findById(req.user.id);
  if (!user) {
    res.status(401).json({ error: "User not found" });
  }
  // if the id of the user sending the request and the id on the product do not match??
  if (product.user.toString() !== user.id) {
    res.status(401).json({ error: "User not authorized" });
  }

  const updatedProduct = await Product.findByIdAndUpdate(
    req.params.id,
    req.body,
    {
      new: true,
    }
  );
  res.status(200).json({ updatedProduct });
};
const deleteProduct = async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (!product) {
    res.status(400).json({ error: "Product not found" });
  }
  const user = await userModel.findById(req.user.id);
  if (!user) {
    res.status(401).json({ error: "User not found" });
  }
  // if the id of the user sending the request and the id on the product do not match??
  if (product.user.toString() !== user.id) {
    res.status(401).json({ error: "User not authorized" });
  }

  const deletedProduct = await Product.findByIdAndRemove(req.params.id);
  res.status(200).json({ message: "Deleted successfully" });
};

module.exports = {
  getAllProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
};
