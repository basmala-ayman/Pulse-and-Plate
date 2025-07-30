import '../../App';
import './Main.css';
import { Container } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import {Link} from 'react-router-dom';
export default function Main() {
    return (
        <div className="main">
            <div className='cont'>

                <Container fluid="lg" className='inner-cont'>
                    <section className='section d-flex flex-column'>
                        <h1><span>FRESH FOOD</span> WITH GREAT TASTE</h1>
                        <p>Delight in the goodness of fresh food crafted to perfection, where every ingredient is handpicked for quality and flavor. With vibrant colors, crisp textures, and natural aromas, each bite bursts with the essence of farm-fresh produce</p>
                        <div className="buttons d-flex">
                            <Link to="/menu" className='submit-btn text-decoration-none' >Shop Now</Link>
                        </div>
                    </section>
                </Container>
            </div>
        </div>
    );
};