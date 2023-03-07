import mongoose from "mongoose";

const connection = async () => {
  const url = process.env.DB_URL;
  try {
    mongoose.set({ strictQuery: true });
    await mongoose.connect(url);
    console.log("DB connection established")
  } catch (error) {
    console.log(error);
  }
};

export default connection;
