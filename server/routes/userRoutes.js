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
routes.post(
  "/signup",
  expressAsyncHandler(async (req, res) => {
    const { name, email, password } = req.body;
    const user = await User.findOne({ email });
    console.log(user);

    if (user) {
      return res.status(400).send({ message: "User already exist" });
    } else {
      const hashPassword = bcrypt.hashSync(password);
      const newUser = await User.create({
        name,
        email,
        password: hashPassword,
      });
      const user = await newUser.save();

      return res.send({
        _id: user._id,
        email: user.email,
        name: user.name,
        isAdmin: user.isAdmin,
        token : generateToken(user),
      });
    }
  })
);

export default routes;
