import express from "express";
import Product from "../models/productModel.js";
import data from "../data.js";
const routes = express.Router();

routes.get("/", async (req, res) => {
  await Product.deleteMany({});
  const createProducts = await Product.insertMany(data.products);
  res.send({ createProducts });
});

export default routes;
