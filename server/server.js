import express from "express";
import * as dotenv from "dotenv";
import cors from "cors";
import connection from "./connection/connection.js";
import productRoutes from "./routes/productRoutes.js";
import seedRoutes from "./routes/seedRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";

dotenv.config();
const PORT = process.env.PORT || 8000;
const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/seed", seedRoutes);
app.use("/api", productRoutes);
app.use("/api", orderRoutes);
app.use("/api/user", userRoutes);

app.use((err, req, res, next) => {
  res.status(500).send({ message: err.message });
  next();
});

connection();

app.listen(PORT, () => {
  console.log(`Server listening on : http://localhost:${PORT}`);
});
