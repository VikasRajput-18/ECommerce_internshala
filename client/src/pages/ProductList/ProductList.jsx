import React from "react";
import "./ProductList.css";
import data from "../../data";
import { Link } from "react-router-dom";

const ProuctList = () => {
  return (
    <main>
      <h1 className="title">Featured Products</h1>
      <div className="products">
        {data?.products?.map((product) => {
          console.log(product);
          return (
            <div
              className="product shadow-md position-relative"
              key={product.slug}
            >
              <p className="rating position-absolute">{product?.rating}</p>
              <Link to={`/product/${product.slug}`}>
                <img src={product.image} alt={product.name} />
                <div className="product_details">
                  <div className="product_info">
                    <p className="product_name">{product.name}</p>
                    <p className="product_price">${product.price}</p>
                  </div>
                  <button>Add To Cart</button>
                </div>
              </Link>
            </div>
          );
        })}
      </div>
    </main>
  );
};

export default ProuctList;
