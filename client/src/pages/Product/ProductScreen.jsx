import React from "react";
import "./ProductScreen.css";
import { useParams } from "react-router-dom";

const ProductScreen = () => {
  const { slug } = useParams();

  console.log(slug)
  return <div>ProductScreen</div>;
};

export default ProductScreen;
