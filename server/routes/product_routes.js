import expres from "express";
import {
  getCartProduct,
  getProducts,
  getSingleProducts,
} from "../controller/product_controller.js";
const routes = expres.Router();

routes.get("/products", getProducts);
routes.get("/product/slug/:slug", getSingleProducts);
routes.get("/product/:id", getCartProduct);

export default routes;
