import expres from "express";
import { getProducts } from "../controller/product_controller.js";
const routes = expres.Router();

routes.get("/products", getProducts);

export default routes;
