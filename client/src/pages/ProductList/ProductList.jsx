import React, { useEffect, useReducer, useState } from "react";
import "./ProductList.css";
import axios from "axios";
import { Link } from "react-router-dom";
import { API_BASE_URL } from "../../constant";
import logger from "use-reducer-logger";

const reducer = (state, action) => {
  switch (action.type) {
    case "FETCH_REQUEST": {
      return { ...state, loading: true };
    }
    case "FETCH_SUCCESS": {
      return { ...state, loading: false, products: action.payload };
    }
    case "FETCH_FAIL": {
      return { ...state, loading: false, error: action.payload };
    }

    default:
      return state;
  }
};

const ProuctList = () => {
  const [{ error, loading, products }, dispatch] = useReducer(logger(reducer), {
    error: "",
    loading: true,
    products: [],
  });

  const fetchProducts = async () => {
    try {
      dispatch({ type: "FETCH_REQUEST" });
      const response = await axios.get(`${API_BASE_URL}/api/products`);
      dispatch({ type: "FETCH_SUCCESS", payload: response.data });
    } catch (error) {
      console.log(error);
      dispatch({ type: "FETCH_FAIL", payload: error.message });
      console.log(error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <main>
      <h1 className="title">Featured Products</h1>
      <div className="products">
        {loading ? (
          <div>
            <h1>Loading...</h1>
          </div>
        ) : error ? (
          <div>{error}</div>
        ) : (
          products?.map((product, ind) => {
            return (
              <div
                key={`${product?.slug}-${ind}`}
                className="product shadow-md position-relative"
              >
                <p className="rating position-absolute">{product?.rating}</p>
                <Link to={`/product/${product.slug}`}>
                  <img src={product.image} alt={product.name} />
                  <div className="product_details">
                    <div className="product_info">
                      <p className="product_name">{product.name}</p>
                      <p className="product_price">${product.price}</p>
                    </div>
                    <button className="">Add To Cart</button>
                  </div>
                </Link>
              </div>
            );
          })
        )}
      </div>
    </main>
  );
};

export default ProuctList;
