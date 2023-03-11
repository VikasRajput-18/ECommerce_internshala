import React, { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { Navbar, Container, Nav, Badge } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { Store } from "../store";

const Header = () => {
  const { state } = useContext(Store);

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
            </Nav>
          </Container>
        </Navbar>
      </header>
    </div>
  );
};

export default Header;
