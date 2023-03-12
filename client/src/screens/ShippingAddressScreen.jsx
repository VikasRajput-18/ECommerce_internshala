import React, { useContext, useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { Helmet } from "react-helmet-async";
import { Store } from "../store";
import { useNavigate } from "react-router-dom";
import CheckoutSteps from "../components/CheckoutSteps";

const ShippingAddressScreen = () => {
  const navigate = useNavigate();
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const {
    cart: { shippingAddress: deliveryAddress },
    userInfo,
  } = state;
  const [shippingAddress, setShippingAddress] = useState({
    fullName: deliveryAddress.fullName || "",
    address: deliveryAddress.address || "",
    city: deliveryAddress.city || "",
    postalCode: deliveryAddress.postalCode || "",
    country: deliveryAddress.country || "",
  });

  useEffect(() => {
    if (!userInfo) {
      navigate("/signin?redirect=/shipping");
    }
  }, [userInfo]);

  const handleChange = (e) => {
    const { value, name } = e.target;
    setShippingAddress((prev) => ({ ...prev, [name]: value }));
  };

  const submitHandler = (e) => {
    e.preventDefault();
    ctxDispatch({ type: "SAVE_SHIPPING_ADDRESS", payload: shippingAddress });
    localStorage.setItem("shippingAddress", JSON.stringify(shippingAddress));
    navigate("/payment");
  };

  return (
    <div className="mt-5">
      <Helmet>
        <title>Shipping Address</title>
      </Helmet>
      <CheckoutSteps step1 step2></CheckoutSteps>
      <div className="container small-container">
        <h1 className="my-4 fw-bold">Shipping Address</h1>
        <Form onSubmit={submitHandler}>
          <Form.Group className="mb-3" controlId="fullName">
            <Form.Label>Full Name</Form.Label>
            <Form.Control
              value={shippingAddress.fullName}
              name="fullName"
              onChange={handleChange}
              required
            ></Form.Control>
          </Form.Group>
          <Form.Group className="mb-3" controlId="address">
            <Form.Label>Address</Form.Label>
            <Form.Control
              value={shippingAddress.address}
              name="address"
              onChange={handleChange}
              required
            ></Form.Control>
          </Form.Group>
          <Form.Group className="mb-3" controlId="city">
            <Form.Label>City</Form.Label>
            <Form.Control
              value={shippingAddress.city}
              name="city"
              onChange={handleChange}
              required
            ></Form.Control>
          </Form.Group>
          <Form.Group className="mb-3" controlId="postalCode">
            <Form.Label>Postal Code</Form.Label>
            <Form.Control
              value={shippingAddress.postalCode}
              name="postalCode"
              onChange={handleChange}
              required
            ></Form.Control>
          </Form.Group>
          <Form.Group className="mb-3" controlId="country">
            <Form.Label>Country</Form.Label>
            <Form.Control
              value={shippingAddress.country}
              name="country"
              onChange={handleChange}
              required
            ></Form.Control>
          </Form.Group>
          <div className="mb-3">
            <Button variant="primary" type="submit">
              Continue
            </Button>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default ShippingAddressScreen;
