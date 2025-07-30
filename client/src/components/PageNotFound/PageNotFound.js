import React from 'react';
import { Link } from 'react-router-dom';
import './PageNotFound.css';

const errorImage = '/images/error-01.png';

export default function PageNotFound() {
    return (
        <div className="not-found-page-container">
            <div className="not-found-content">
                <img src={errorImage} alt="404 Error Illustration" className="not-found-image" />
                <h1 className="not-found-title">Oopsie! Something's missing...</h1>
                <p className="not-found-text">
                    It seems like we donut find what you searched. The page you were looking for doesn't exist, isn't available or was loading incorrectly.
                </p>
                <Link to="/" className="not-found-button">
                    Back To Home
                </Link>
            </div>
        </div>
    );
}

