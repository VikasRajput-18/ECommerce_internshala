import express from "express";
import Product from "../models/productModel.js";
import data from "../data.js";
import User from "../models/userModel.js";
const routes = express.Router();

routes.get("/", async (req, res) => {
  await Product.deleteMany({});
  const createProducts = await Product.insertMany(data.products);

  await User.deleteMany({});
  const createUsers = await User.insertMany(data.users);

  res.send({ createProducts, createUsers });
});

export default routes;
