import React from "react";
import "../../App";
import { Link, useNavigate } from "react-router-dom";
import { useUser } from "../../UserContext";
import "./NavAdmin.css";
// React Bootstrap
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import Dropdown from "react-bootstrap/Dropdown";

export default function NavAdmin() {
  const { user, setUser } = useUser();
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate("../login");
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    setUser(null);
  };

  return (
    <Navbar expand="md" className="fixed-top">
      <Container fluid>
        <Navbar.Brand>
          <img
            src="/images/logo-trans.png"
            width="40"
            height="40"
            className="d-inline-block align-top"
            alt="React Bootstrap logo"
          />
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
          <Dropdown align="end">
            <Dropdown.Toggle variant="success" id="dropdown-user">
              {user?.name ? user.name.split(" ")[0] : "Login | Register"}
            </Dropdown.Toggle>

            <Dropdown.Menu>
              <>
                {/* <Dropdown.Item as={Link} to="./adminAccount">
                  Profile
                </Dropdown.Item> */}
                <Dropdown.Item onClick={handleLogout}>Logout</Dropdown.Item>
              </>
            </Dropdown.Menu>
          </Dropdown>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
