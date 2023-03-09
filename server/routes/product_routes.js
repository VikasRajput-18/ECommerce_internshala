import expres from "express";
import {
  getProducts,
  getSingleProducts,
} from "../controller/product_controller.js";
const routes = expres.Router();

routes.get("/products", getProducts);
routes.get("/product/slug/:slug", getSingleProducts);

export default routes;
