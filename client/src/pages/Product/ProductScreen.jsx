import React, { useEffect } from "react";
import "./ProductScreen.css";
import { useParams } from "react-router-dom";
import { useReducer } from "react";
import axios from "axios";
import { API_BASE_URL } from "../../constant";
import { Col, ListGroup, Row } from "react-bootstrap";
import Rating from "../../components/Rating";

const reducer = (state, action) => {
  switch (action.type) {
    case "FETCH_REQUEST": {
      return { ...state, loading: true };
    }
    case "FETCH_SUCCESS": {
      return { ...state, loading: false, product: action.payload };
    }
    case "FETCH_FAIL": {
      return { ...state, loading: false, error: action.payload };
    }

    default:
      return state;
  }
};

const ProductScreen = () => {
  const { slug } = useParams();

  const [{ error, loading, product }, dispatch] = useReducer(reducer, {
    error: "",
    loading: true,
    product: [],
  });

  const fetchProducts = async () => {
    try {
      dispatch({ type: "FETCH_REQUEST" });
      const response = await axios.get(
        `${API_BASE_URL}/api/product/slug/${slug}`
      );

      console.log(response.data);
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

  return loading ? (
    <div>Loading...</div>
  ) : error ? (
    <div>{error}</div>
  ) : (
    <div>
      <Row>
        <Col md={6}>
          <img className="img-large" src={product?.image} alt={product?.name} />
        </Col>
        <Col md={3}>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h1>{product?.name}</h1>
            </ListGroup.Item>
            <ListGroup.Item>
            <Rating rating={product?.rating} numReviews={product?.numReviews} />
            </ListGroup.Item>

          </ListGroup>
        </Col>
        <Col md={3}></Col>
      </Row>
    </div>
  );
};

export default ProductScreen;
