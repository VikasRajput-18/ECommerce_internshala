import React from "react";
import { Button, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import Rating from "./Rating";

const SingleProduct = ({ product, ind }) => {
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
        <Button className="">Add To Cart</Button>
      </Card.Body>
    </Card>
  );
};

export default SingleProduct;
