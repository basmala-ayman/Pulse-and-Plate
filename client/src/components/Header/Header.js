import React from 'react';
import './Header.css';
import '../../App';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useUser } from "../../UserContext";
import { deleteUser } from '../../api/UsersAPI';
// React Bootstrap
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Dropdown from 'react-bootstrap/Dropdown';

// Font Awesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default function Header() {
    const { user, setUser } = useUser();
    const navigate = useNavigate();

    const handleLogout = () => {
        navigate('/login');
        localStorage.removeItem("user");
        localStorage.removeItem("token");
        setUser(null);
    };
    const handleDeleteAccount = async () => {
        try {
            const response = await deleteUser(user._id);
            if (response) {
                localStorage.removeItem('user');
                localStorage.removeItem('token');
                setUser(null);
                alert('User deleted successfully!');
                navigate('/login');
            }
        } catch (error) {
            alert(error.message || 'Something went wrong');
        }
    };

    return (
        <Navbar expand="md" className="fixed-top">
            <Container fluid="md">
                <Navbar.Brand as={Link} to="/home">
                    <img
                        src="/images/logo-trans.png"
                        width="40"
                        height="40"
                        className="d-inline-block align-top"
                        alt="React Bootstrap logo"
                    />
                </Navbar.Brand>

                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto ms-auto">
                        <Nav.Link as={NavLink} to="/home">Home</Nav.Link>
                        <Nav.Link as={NavLink} to="/menu">Menu</Nav.Link>
                        <Nav.Link as={NavLink} to="/about">About</Nav.Link>
                        <Nav.Link as={NavLink} to="/contact-us">Contact Us</Nav.Link>
                    </Nav>

                    <div className="icons d-flex align-items-center gap-3">
                        <Link to="/Cart">
                            <FontAwesomeIcon icon="cart-shopping" />
                        </Link>{" "}

                        <Dropdown align="end">
                            <Dropdown.Toggle className='head-drop'  variant="success" id="dropdown-user">
                                {user?.name ? user.name.split(" ")[0] : "Login | Register"}
                            </Dropdown.Toggle>

                            <Dropdown.Menu>
                                {user?.name ? (
                                    <>
                                        <Dropdown.Item as={Link} to="/userAccount">Profile</Dropdown.Item>
                                        <Dropdown.Item onClick={handleLogout}>Logout</Dropdown.Item>
                                        <Dropdown.Item onClick={handleDeleteAccount}>Delete Account</Dropdown.Item>
                                    </>
                                ) : (
                                    <>
                                        <Dropdown.Item as={Link} to="/login">Login</Dropdown.Item>
                                        <Dropdown.Item as={Link} to="/register">Register</Dropdown.Item>
                                    </>
                                )}
                            </Dropdown.Menu>
                        </Dropdown>
                    </div>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}
