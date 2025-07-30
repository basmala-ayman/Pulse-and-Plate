import "../../App";
import "./WhyChooseUs.css";
import { Container } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function About() {
  return (
    <div className="whyChooseUS">
      <Container fluid="md">
        <div className="whyChooseUS-header">
        <h2>Our Services</h2>
      </div>

   <div className="container">
  <div className="row ">
    <div className="col-lg-4 col-md-6 mb-4">
      <div className="card h-100 text-center p-3">
        <p><FontAwesomeIcon icon="fa-solid fa-percent" size="2x" /></p>
        <h5 className="card-title">Join For Free</h5>
        <p className="card-text">
          Sign up for FREE! Tell us your food preferences to start saving up to 30% on your weekly grocery bill.
        </p>
      </div>
    </div>

    <div className="col-lg-4 col-md-6 mb-4">
      <div className="card h-100 text-center p-3">
        <p><FontAwesomeIcon icon="fa-solid fa-truck-fast" size="2x" /></p>
        <h5 className="card-title">Skip the Store</h5>
        <p className="card-text">
          Shop produce, staples, and seasonal finds! We deliver straight to your door every week.
        </p>
      </div>
    </div>

    <div className="col-lg-4 col-md-6 mb-4">
      <div className="card h-100 text-center p-3">
        <p><FontAwesomeIcon icon="fa-solid fa-carrot" size="2x" /></p>
        <h5 className="card-title">Do Some Good</h5>
        <p className="card-text">
          Each order helps fix a broken food system and build a more sustainable future.
        </p>
      </div>
    </div>
  </div>
</div>
      </Container>
    </div>
  );
}
