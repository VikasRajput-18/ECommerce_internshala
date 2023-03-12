import express from "express";
import expressAsyncHandler from "express-async-handler";
import User from "../models/userModel.js";
import bcrypt from "bcryptjs";
import { generateToken } from "../utils.js";

const routes = express.Router();

routes.post(
  "/signin",
  expressAsyncHandler(async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    const token = generateToken(user);

    if (user) {
      if (bcrypt.compareSync(password, user.password)) {
        return res.send({
          _id: user._id,
          email: user.email,
          name: user.name,
          isAdmin: user.isAdmin,
          token,
        });
      }
      return res.status(400).send({ message: "Invalid email or password" });
    } else {
      return res.status(500).send({ message: "Something went wrong" });
    }
  })
);

export default routes;
