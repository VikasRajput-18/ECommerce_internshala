import express from "express";
import * as dotenv from "dotenv";
import cors from "cors";
import connection from "./connection/connection.js";
import productRoutes from "./routes/product_routes.js";

dotenv.config();
const PORT = process.env.PORT || 8000;
const app = express();
app.use(cors());
app.use(express.json());

app.use("/api", productRoutes);

connection();

app.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`);
});