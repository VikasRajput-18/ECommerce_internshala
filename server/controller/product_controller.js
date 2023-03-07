import data from "../data.js";

const getProducts = async (req, res) => {
  res.send(data?.products);
};

export { getProducts };
