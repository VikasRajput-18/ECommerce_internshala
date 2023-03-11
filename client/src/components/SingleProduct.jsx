import React, { useContext } from "react";
import { Button, Card } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import Rating from "./Rating";
import { Store } from "../store";
import axios from "axios";
import { API_BASE_URL } from "../constant";

const SingleProduct = ({ product, ind }) => {
  const navigate = useNavigate();
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const {
    cart: { cartItems },
  } = state;

  const addToCartHandler = async (item) => {
    const existItem = cartItems?.find((x) => x._id === product._id);
    const quantity = existItem ? existItem.quantity + 1 : 1;
    const { data } = await axios.get(`${API_BASE_URL}/api/product/${item._id}`);
    if (data.countInStock < quantity) {
      window.alert("Sorry , Product is out of stock");
      return;
    }

    ctxDispatch({
      type: "CART_ADD_ITEM",
      payload: { ...item, quantity },
    });
  };

  console.log(product);

  return (
    <Card
      key={`${product?.slug}-${ind}`}
      className="product shadow-md position-relative"
    >
      <p className="rating position-absolute">{product?.rating}</p>
      <Card.Body className="product_details">
        <Link to={`/product/${product.slug}`}>
          <img src={product.image} alt={product.name} />
          <div className="product_info">
            <Card.Text className="product_name">{product.name}</Card.Text>
            <Card.Text className="product_price">${product.price}</Card.Text>
          </div>
        </Link>
        <Rating rating={product.rating} numReviews={product?.numReviews} />

        {product.countInStock > 0 ? (
          <Button className="" onClick={() => addToCartHandler(product)}>
            Add To Cart
          </Button>
        ) : (
          <Button variant="light" disabled>
            Out of stock
          </Button>
        )}
      </Card.Body>
    </Card>
  );
};

export default SingleProduct;
