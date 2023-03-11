import React, { useEffect, useReducer, useState } from "react";
import "./ProductList.css";
import axios from "axios";
import { Link } from "react-router-dom";
import { API_BASE_URL } from "../../constant";
import logger from "use-reducer-logger";

import { Col, Container, Row } from "react-bootstrap";
import SingleProduct from "../../components/SingleProduct";
import LoadingBox from "../../components/LoadingBox";
import MessageBox from "../../components/MessageBox";

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
      dispatch({ type: "FETCH_SUCCESS", payload: response.data.allProducts });
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
    <Container className="mt-5">
      <h1 className="title">Featured Products</h1>
      <div className="products">
        {loading ? (
          <div>
            <LoadingBox />
          </div>
        ) : error ? (
          <MessageBox variant="danger">{error}</MessageBox>
        ) : (
          <Row className="">
            {products?.map((product, ind) => {
              return (
                <Col key={ind} sm={6} md={4} lg={3} className="mb-3">
                  <SingleProduct product={product} key={ind} />
                </Col>
              );
            })}
          </Row>
        )}
      </div>
    </Container>
  );
};

export default ProuctList;
