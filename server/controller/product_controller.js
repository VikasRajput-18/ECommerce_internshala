import data from "../data.js";

const getProducts = async (req, res) => {
  res.send(data?.products);
};

const getSingleProducts = async (req, res) => {
  const product = data?.products.find((item) => item?.slug == req.params.slug);
  if (product) {
    return res.send(product);
  }
  return res.status(404).send({ message: "Product not found" });
};

const getCartProduct = async (req, res) => {
  const product = data?.products.find((item) => item?._id == req.params.id);
  if (product) {
    return res.send(product);
  }
  return res.status(404).send({ message: "Product not found" });
};

export { getProducts, getSingleProducts , getCartProduct };
