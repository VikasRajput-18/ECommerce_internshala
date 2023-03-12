import React, { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { Navbar, Container, Nav, Badge, NavDropdown } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { Store } from "../store";

const Header = () => {
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { userInfo } = state;

  const signoutHandler = () => {
    ctxDispatch({ type: "USER_SIGNOUT" });
    localStorage.removeItem("userInfo");
  };

  return (
    <div>
      <header>
        <Navbar bg="dark" variant="dark">
          <Container>
            <LinkContainer to="/">
              <Navbar.Brand>Amazona</Navbar.Brand>
            </LinkContainer>
            <Nav className="me-auto">
              <Link to="/cart" className="nav-link">
                Cart{" "}
                {state.cart.cartItems.length > 0 && (
                  <Badge pill bg="danger">
                    {state.cart.cartItems.reduce((a, b) => a + b.quantity, 0)}
                  </Badge>
                )}
              </Link>

              {userInfo ? (
                <NavDropdown title={userInfo.name} id="basic-nav-dropdown">
                  <LinkContainer to="/profile">
                    <NavDropdown.Item>User Profile</NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to="/orderhistory">
                    <NavDropdown.Item>Order History</NavDropdown.Item>
                  </LinkContainer>
                  <NavDropdown.Divider />

                  <Link
                    className="dropdwon-iten text-dark ps-3"
                    to="#signout"
                    onClick={signoutHandler}
                  >
                    Sign Out
                  </Link>
                </NavDropdown>
              ) : (
                <Link to="/signin" className="nav-link">
                  Sign In
                </Link>
              )}
            </Nav>
          </Container>
        </Navbar>
      </header>
    </div>
  );
};

export default Header;
