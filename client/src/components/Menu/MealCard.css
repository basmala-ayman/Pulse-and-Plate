.meal-card {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 100%;
  max-width: 320px;
  margin: 1rem auto;
  padding: 1.5rem;
  border: 1px solid #ddd;
  border-radius: var(--border-radius);
  background-color: #fff;
  box-shadow: var(--shadow-light);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  overflow: hidden;
  cursor: pointer;
  box-sizing: border-box;
  text-align: center;
  word-wrap: break-word;
}

.meal-image-container {
  position: relative;
  margin-bottom: 1rem;
  border-radius: var(--border-radius);
  overflow: hidden;
  box-shadow: 0 3px 8px rgba(0, 0, 0, 0.05);
}

.meal-image {
  width: 100%;
  height: 9rem;
  object-fit: cover;
  border-radius: var(--border-radius);
  transition: transform 0.3s ease;
  display: block;
  user-select: none;
}

.meal-image:hover,
.meal-image:focus {
  transform: scale(1.06);
  outline: 2px solid var(--secondary-color);
}

.overlay {
  position: absolute;
  inset: 0;
  background-color: rgba(0, 0, 0, 0.5);
  border-radius: var(--border-radius);
  display: flex;
  justify-content: center;
  align-items: center;
  opacity: 0;
  visibility: hidden;
  transition: opacity 0.3s ease, visibility 0.3s ease;
  pointer-events: none;
}

.meal-card:hover .overlay,
.meal-card:focus-within .overlay {
  opacity: 1;
  visibility: visible;
  pointer-events: auto;
}

.overlay .view-details {
  background-color: var(--secondary-color);
  color: #fff;
  border: none;
  padding: clamp(0.4rem, 1vw, 0.75rem) clamp(0.75rem, 2.5vw, 1.2rem);
  font-size: clamp(0.8rem, 1.8vw, 1rem);
  cursor: pointer;
  border-radius: 0.5rem;
  transition: background-color 0.3s ease, transform 0.3s ease;
  box-shadow: 0 0.25rem 0.375rem rgba(0, 0, 0, 0.3);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  box-sizing: border-box;
  min-width: 75px;
  max-width: 90%;
  text-align: center;
}

.overlay .view-details:hover,
.overlay .view-details:focus {
  background-color: var(--primary-color);
  transform: scale(1.05);
  outline: 2px solid #fff;
}

.fav-icon {
  position: absolute;
  top: 0.75rem;
  right: 0.75rem;
  font-size: clamp(1.25rem, 3vw, 1.5rem);
  cursor: pointer;
  color: #ccc;
  transition: transform 0.3s ease, color 0.3s ease, box-shadow 0.3s ease;
  user-select: none;
}

.fav-icon:hover,
.fav-icon:focus {
  transform: scale(1.3);
  color: #ff6347;
  box-shadow: var(--shadow-icon);
  outline: none;
}

.fav-icon.favorited {
  color: #e0245e;
}

.fav-icon.favorited:hover,
.fav-icon.favorited:focus {
  color: #c0392b;
  box-shadow: var(--shadow-icon-active);
}

.add-to-cart {
  background-color: var(--primary-color);
  color: #fff;
  border: none;
  padding: 0.8rem 1.5rem;
  font-size: clamp(0.9rem, 2vw, 1rem);
  border-radius: 0.5rem;
  margin-top: auto;
  cursor: pointer;
  box-shadow: var(--shadow-hover);
  transition: background-color 0.3s ease, transform 0.3s ease;
  user-select: none;
}

.add-to-cart:hover,
.add-to-cart:focus {
  background-color: var(--secondary-color);
  transform: scale(1.05);
  outline: 2px solid #fff;
}

.meal-name {
  margin: 1rem 0 0.5rem;
  font-size: clamp(1.15rem, 3vw, 1.3rem);
  font-weight: 700;
  color: var(--primary-color);
  text-transform: capitalize;
  line-height: 1.2;
  white-space: normal;
  overflow-wrap: break-word;
}

.meal-price {
  font-size: clamp(1.35rem, 4vw, 1.6rem);
  color: var(--secondary-color);
  font-weight: 700;
  margin-bottom: 1rem;
  letter-spacing: 0.03em;
  white-space: normal;
  overflow-wrap: break-word;
}
