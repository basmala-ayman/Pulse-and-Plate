import React, { useState, useEffect, useRef } from "react";
import { useSearchParams } from "react-router-dom";
import axios from "axios";
import MealCard from "./MealCard";
import "./Categories.css";

export default function Categories() {
  const [categories, setCategories] = useState([]);
  const [activeCategory, setActiveCategory] = useState(0);
  const [loading, setLoading] = useState(true);
  const mealsRef = useRef(null);
  const [searchParams, setSearchParams] = useSearchParams();


  useEffect(() => {
    axios
      .get("http://localhost:3050/api/product/list")
      .then((response) => {
        if (
          response.data &&
          response.data.menu &&
          Array.isArray(response.data.menu)
        ) {
          const filteredCategories = response.data.menu.filter((cat) =>
            ["Salads", "Grilled", "Wraps"].includes(cat.category)
          );

          const formattedCategories = filteredCategories.map((cat) => ({
            title: cat.category,
            meals: cat.items,
          }));

          setCategories(formattedCategories);
        } else {
          console.error("Invalid data format received:", response.data);
        }
      })
      .catch((error) => {
        console.error("There was an error while fetching the menu: ", error);
      })
      .finally(() => setLoading(false));
  }, []); 


  useEffect(() => {
    const categoryParam = searchParams.get("category");
    if (categories.length > 0 && categoryParam) {
      const index = categories.findIndex(
        (cat) => cat.title.toLowerCase() === categoryParam.toLowerCase()
      );
      if (index !== -1) {
        setActiveCategory(index);
      }
    }
  }, [categories, searchParams]);

  const handleCategoryClick = (index) => {
    setActiveCategory(index);
    setSearchParams({ category: categories[index].title.toLowerCase() });

    if (mealsRef.current) {
      setTimeout(() => {
        mealsRef.current.scrollIntoView({ behavior: "smooth" });
      }, 0);
    }
  };

  return (
    <div className="categories-container container">
      <div className="categories row justify-content-center mb-4">
        {loading ? (
          <div className="text-center">Loading categories...</div>
        ) : categories.length === 0 ? (
          <div className="text-center">No categories found.</div>
        ) : (
          categories.map((category, index) => (
            <div
              key={index}
              className={`col-6 col-sm-4 col-md-3 text-center category-title ${
                activeCategory === index ? "active" : ""
              }`}
              onClick={() => handleCategoryClick(index)}
              style={{ cursor: "pointer" }}
            >
              {category.title}
            </div>
          ))
        )}
      </div>

      <div className="meal-cards-container" ref={mealsRef}>
        {activeCategory !== null &&
        categories[activeCategory] &&
        categories[activeCategory].meals ? (
          <div className="meals-grid">
            {categories[activeCategory].meals.map((meal, i) => (
              <MealCard key={i} meal={meal} />
            ))}
          </div>
        ) : (
          !loading && (
            <div className="text-center">No meals available for this category.</div>
          )
        )}
      </div>
    </div>
  );
}
