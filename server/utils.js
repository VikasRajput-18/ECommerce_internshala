import jwt from "jsonwebtoken";
import * as dotenv from "dotenv";

dotenv.config();

export const generateToken = (user) => {
  const token = jwt.sign(
    {
      _id: user._id,
      email: user.email,
      name: user.name,
      isAdmin: user.isAdmin,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: "30d",
    }
  );
  return token;
};
