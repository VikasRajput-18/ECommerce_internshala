import {
  getCartProduct,
  getSingleProducts,
} from "../controller/product_controller.js";

import express from "express";
import Product from "../models/productModel.js";
const routes = express.Router();

routes.get("/products", async (req, res) => {
  const allProducts = await Product.find({});
  res.send({ allProducts });
});

routes.get("/product/slug/:slug", async (req, res) => {
  const product = await Product.findOne({ slug: req.params.slug });
  if (product) {
    return res.send(product);
  }
  return res.status(404).send({ message: "Product not found" });
});
routes.get("/product/:id", async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (product) {
    return res.send(product);
  }
  return res.status(404).send({ message: "Product not found" });
});

export default routes;
