import React from 'react';
import './Categories.css';
import { Link } from 'react-router-dom';

export default function Categories() {
  const categories = [
    {
      name: 'Salads',
      image: 'images/spinach-salad.jpg',
    },
    {
      name: 'Grilled',
      image: 'images/Grilled-Veggie-Kebabs.jpg',
    },
    {
      name: 'Wraps',
      image: 'images/Grilled-Veggie-&-Hummus-Wrap.jpg',
    },
  ];

  return (
    <div className="container categories-home">
      <div className="text-center mb-5 categories-header">
        <h2>Our Categories</h2>
      </div>
      <div className="row justify-content-center">
        {categories.map((cat, index) => (
          <div className="col-sm-12 col-md-6 col-lg-3 mb-4" key={index}>
            <div className="category-card ">
              
                <img src={cat.image} alt={cat.name} className="category-image img-fluid" />
              <h3 className="category-title-main fs-4">{cat.name}</h3>
              <Link to={`/menu?category=${cat.name.toLowerCase()}`} className='submit-btn text-decoration-none'>Go to {cat.name}
              </Link>
              </div>
              
            </div>
    
        ))}
      </div>
    </div>
  );
}
