import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { Form, Button, Container, Toast } from "react-bootstrap";
import { Helmet } from "react-helmet-async";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { API_BASE_URL } from "../constant";
import { Store } from "../store";
import { toast } from "react-toastify";
import { getError } from "../screens/utils";

const SignupScreen = () => {
  const { search } = useLocation();
  const navigate = useNavigate();
  const redirectUrl = new URLSearchParams(search).get("redirect");
  const redirect = redirectUrl ? redirectUrl : "/";

  const [signup, setSignup] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { userInfo } = state;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSignup((prev) => ({ ...prev, [name]: value }));
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    if (signup.password !== signup.confirmPassword) {
      toast.error("Paassword do not match");
    }
    try {
      const { data } = await axios.post(
        `${API_BASE_URL}/api/user/signup`,
        signup
      );
      ctxDispatch({ type: "USER_SIGNIN", payload: data });
      localStorage.setItem("userInfo", JSON.stringify(data));
      navigate(redirect || "/");
    } catch (error) {
      console.log(error);
      toast.error(getError(error));
    }
  };

  useEffect(() => {
    if (userInfo) return navigate(redirect);
  }, [userInfo, redirect]);

  return (
    <Container className="small-container">
      <Helmet>
        <title>Sign Up</title>
      </Helmet>

      <h1 className="my-3">Sign Up</h1>

      <Form onSubmit={submitHandler}>
        <Form.Group className="mb-3" controlId="name">
          <Form.Label>Name</Form.Label>
          <Form.Control
            name="name"
            type="text"
            placeholder="Enter Name"
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="email">
          <Form.Label>Email</Form.Label>
          <Form.Control
            name="email"
            type="email"
            placeholder="Enter email"
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control
            name="password"
            placeholder="Enter password"
            onChange={handleChange}
            type="password"
            required
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="confirmPassword">
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control
            name="confirmPassword"
            placeholder="Confirm password"
            onChange={handleChange}
            type="password"
            required
          />
        </Form.Group>
        <div className="mb-3">
          <Button type="submit">Sign Up</Button>
        </div>
        <div className="mb-3">
          Already have an account ?{" "}
          <Link to={`/signin?redirect=${redirect}`}>Sign In</Link>
        </div>
      </Form>
    </Container>
  );
};

export default SignupScreen;
