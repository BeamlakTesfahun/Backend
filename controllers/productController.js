const express = require("express");
const Product = require("../models/productModel");
const app = express();
app.use(express.json()); // Add this line to parse JSON request bodies

const getProduct = async (req, res) => {
  //console.log("body data", req.body);
  const products = await Product.find();
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
  const deletedProduct = await Product.findByIdAndRemove(req.params.id);
  res.status(200).json({ message: "Deleted successfully" });
};

module.exports = { getProduct, createProduct, updateProduct, deleteProduct };
