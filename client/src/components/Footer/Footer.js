import "../../App";

import "./Footer.css";
import { Container } from "react-bootstrap";
import {Link} from 'react-router-dom';


export default function Footer() {
    return (
        <footer>
            <Container fluid="md">
            <div className="wrapper-footer gap-3">
                <div className="info">
                    <h5>Pulse & Plate</h5>
                    <p>Healthy Food Specialties can be described as a company or service focusing on nutritious, high-quality food. </p>
                </div>
                <div className="links">
                    <p >Useful Links</p>
                    <Link to="/about">About Us</Link>
                    <Link to='/contact-us'>Contact us</Link>
                    
                </div>
                <div>
                    <p>Join Our Newsletter Now </p>
                    <p>Get E-mail updates about latest shop and special offers </p>
                </div>
            </div>
            </Container>
        </footer>
    );
}