import React, { useContext, useEffect } from "react";
import "./ProductScreen.css";
import { useParams } from "react-router-dom";
import { useReducer } from "react";
import axios from "axios";
import { API_BASE_URL } from "../../constant";
import { Badge, Button, Card, Col, ListGroup, Row } from "react-bootstrap";
import Rating from "../../components/Rating";
import { Helmet } from "react-helmet-async";
import LoadingBox from "../../components/LoadingBox";
import MessageBox from "../../components/MessageBox";
import { getError } from "../../screens/utils";
import { Store } from "../../store";

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

      dispatch({ type: "FETCH_SUCCESS", payload: response.data });
    } catch (error) {
      dispatch({ type: "FETCH_FAIL", payload: getError(error.message) });
    }
  };
  const { state, dispatch: ctxDispatch } = useContext(Store);

  const addCartHandler = async () => {
    const existItem = state?.cart.cartItems?.find((x) => x._id === product._id);
    console.log(existItem);
    const quantity = existItem ? existItem.quantity + 1 : 1;
    const { data } = await axios.get(
      `${API_BASE_URL}/api/product/${product._id}`
    );

    if (data.countInStock < quantity) {
      window.alert("Sorry , Product is out of stock");
      return;
    }

    ctxDispatch({
      type: "CART_ADD_ITEM",
      payload: { ...product, quantity },
    });
  };

  useEffect(() => {
    fetchProducts();
  }, []);
  return loading ? (
    <div>
      <LoadingBox />
    </div>
  ) : error ? (
    <MessageBox variant="danger">{error}</MessageBox>
  ) : (
    <div className="mt-5">
      <Row className="p-0 m-0">
        <Col md={5}>
          <img className="img-large" src={product?.image} alt={product?.name} />
        </Col>
        <Col md={3}>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h1>{product?.name}</h1>
              <Helmet>
                <title>{product?.name}</title>
              </Helmet>
            </ListGroup.Item>
            <ListGroup.Item>
              <Rating
                rating={product?.rating}
                numReviews={product?.numReviews}
              />
            </ListGroup.Item>
            <ListGroup.Item>Price : $ {product.price}</ListGroup.Item>
            <ListGroup.Item>
              Description :<p> {product.description} </p>
            </ListGroup.Item>
          </ListGroup>
        </Col>
        <Col md={3}>
          <Card>
            <Card.Body>
              <ListGroup>
                <ListGroup.Item>
                  <Row>
                    <Col>Status : </Col>
                    <Col>
                      {product?.countInStock > 0 ? (
                        <Badge bg="success">In Stock</Badge>
                      ) : (
                        <Badge bg="danger">Unavailable</Badge>
                      )}
                    </Col>
                  </Row>
                </ListGroup.Item>
                {product?.countInStock > 0 && (
                  <ListGroup.Item>
                    <div className="d-grid">
                      <Button onClick={addCartHandler} variant="primary">
                        Add To Cart
                      </Button>
                    </div>
                  </ListGroup.Item>
                )}
              </ListGroup>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default ProductScreen;
