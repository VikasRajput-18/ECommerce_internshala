import React from "react";

import ProductList from "./ProductList/ProductList";
import { Helmet } from "react-helmet-async";

const Body = () => {
  return (
    <div>
      <Helmet>
        <title>Amazona</title>
      </Helmet>
      <ProductList />
    </div>
  );
};

export default Body;
