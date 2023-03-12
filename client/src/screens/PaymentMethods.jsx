import React, { useContext, useEffect, useState } from "react";
import CheckoutSteps from "../components/CheckoutSteps";
import { Helmet } from "react-helmet-async";
import { Store } from "../store";
import { useNavigate } from "react-router-dom";
import { Button, Form } from "react-bootstrap";

const PaymentMethods = () => {
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const navigate = useNavigate();

  const {
    cart: { shippingAddress, paymentMethod },
  } = state;

  const [paymentMethodName, setPaymentMethod] = useState(
    paymentMethod || "PayPal"
  );

  useEffect(() => {
    if (!shippingAddress.address) {
      navigate("/shipping");
    }
  }, []);

  const submitHandler = (e) => {
    e.preventDefault();
    ctxDispatch({ type: "SAVE_PAYMENT_METHOD", payload: paymentMethodName });
    localStorage.setItem("paymentMethod", paymentMethodName);
    navigate('/placeorder');
  };

  return (
    <div className="my-5">
      <CheckoutSteps step1 step2 step3></CheckoutSteps>
      <div className="container small-container">
        <Helmet>
          <title>Payment Method</title>
        </Helmet>
        <h1 className="my-3"> Payment Method</h1>

        <Form onSubmit={submitHandler}>
          <div className="mb-3">
            <Form.Check
              type="radio"
              id="PayPal"
              label="PayPal"
              value="PayPal"
              checked={paymentMethodName === "PayPal"}
              onChange={(e) => setPaymentMethod(e.target.value)}
            ></Form.Check>
          </div>
          <div className="mb-3">
            <Form.Check
              type="radio"
              id="Stripe"
              label="Stripe"
              value="Stripe"
              checked={paymentMethodName === "Stripe"}
              onChange={(e) => setPaymentMethod(e.target.value)}
            ></Form.Check>
          </div>
          <div className="mb-3">
            <Button type="submit">Continue</Button>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default PaymentMethods;
