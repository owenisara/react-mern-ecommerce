import React from "react";
import { Container, Nav, Navbar, NavDropdown } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import {
  BsArrowBarRight,
  BsFillCartPlusFill,
  BsFillBagFill,
  BsRocketTakeoffFill,
  BsFillHouseDoorFill,
} from "react-icons/bs";
import { Badge } from "antd";
import { logoutUser } from "../store/Reducer";
import { clearCart } from "../store/Cart";
import { useDispatch, useSelector } from "react-redux";
import Search from "../card/Search";
const NavbarCon = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, cart } = useSelector((state) => ({ ...state }));
  const logout = () => {
    dispatch(logoutUser());
    dispatch(clearCart());
    navigate("/");
  };

  const count = cart.cart.reduce((a, b) => {
    return (b = a + b.count);
  }, 0);

  return (
    <div>
      <Navbar className="p-3" expand="md" bg="light" variant="primary">
        <Container>
          <Navbar.Brand as={Link} to="/">
            <h2>
              <b>
                {" "}
                <BsRocketTakeoffFill className="text-primary" /> Space{" "}
              </b>{" "}
            </h2>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav>
              <Nav.Link as={Link} to="/">
                <BsFillHouseDoorFill className="text-primary" /> Home
              </Nav.Link>
              <Nav.Link as={Link} to="/shop">
                <BsFillBagFill className="text-primary" /> Shop
              </Nav.Link>
              {user.user && user.user.role === "admin" && (
                <>
                  <Nav.Link as={Link} to="/admin/index">
                    Admin
                  </Nav.Link>{" "}
                </>
              )}
            </Nav>
            <Nav className="justify-content-end flex-grow-1 pe-3">
              <Search />
              {!user.user && (
                <>
                  <Nav.Link as={Link} to="/register">
                    register
                  </Nav.Link>
                  <Nav.Link as={Link} to="/login">
                    <BsArrowBarRight /> Login
                  </Nav.Link>
                </>
              )}
              {user.user && (
                <>
                  <Nav.Link as={Link} to="/cart">
                    <Badge count={count}>
                      <h5>
                        <BsFillCartPlusFill className="text-primary" />
                      </h5>
                    </Badge>
                  </Nav.Link>
                  <NavDropdown title={user.user.email} id="basic-nav-dropdown">
                    <NavDropdown.Item as={Link} to="history">
                      Order history{" "}
                    </NavDropdown.Item>
                    <NavDropdown.Item onClick={() => logout()}>
                      Logout <BsArrowBarRight />{" "}
                    </NavDropdown.Item>
                  </NavDropdown>
                </>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
};

export default NavbarCon;
