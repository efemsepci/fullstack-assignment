import React, { useState, useEffect } from 'react';
import { Rating } from "react-simple-star-rating";
import '../style/carousel.css';
import '../style/fonts.css';

const ProductsCarousel = ({ products }) => {
  const [itemsPerPage, setItemsPerPage] = useState(4);
  const totalProducts = products.length;
  const [currentPage, setCurrentPage] = useState(0);//default page

  const colorNames = ["Yellow", "White", "Rose"];
  const colors = ["#E6CA97", "#D9D9D9", "#E1A4A9"];

  //dynamic itemsPerPage, responsive design
  useEffect(() => {
    const updateItemsPerPage = () => {
      if (window.innerWidth <= 768) {
        setItemsPerPage(1); //for mobile
      } else {
        setItemsPerPage(4);
      }
    };

    updateItemsPerPage();
    window.addEventListener('resize', updateItemsPerPage);

    return () => {
      window.removeEventListener('resize', updateItemsPerPage);
    };
  }, []);

  const totalPages = Math.ceil(totalProducts / itemsPerPage);

  //moving pages
  const nextPage = () => {
    setCurrentPage((prevPage) => (prevPage + 1) % totalPages);
  };

  const prevPage = () => {
    setCurrentPage((prevPage) => (prevPage - 1 + totalPages) % totalPages);
  };

  //calculate #items on current page
  const currentProducts = products.slice(
    currentPage * itemsPerPage,
    (currentPage + 1) * itemsPerPage
  );

  //state of color selection
  const [selectedColors, setSelectedColors] = useState(
    products.map(() => 0) 
  );

  //updating color according to selection
  const handleColorChange = (productIndex, color) => {
    const updatedColors = [...selectedColors];
    updatedColors[productIndex] = color;
    setSelectedColors(updatedColors);
  };

  return (
    <div>
      <div>
        <h1 className="title">Product List</h1>
      </div>
      <div className="carousel-container">
        <button className="prev" onClick={prevPage}>
          {"<"}
        </button>
        <div className="carousel-items">
            {/*Viewing products*/}
          {currentProducts.map((product, index) => {
             const globalIndex = currentPage * itemsPerPage + index;
             const selectedColor = selectedColors[globalIndex] || colors[0];
             const selectedColorIndex = colors.indexOf(selectedColor);
 
             //specify product image
             const selectedImage = product.images[colorNames[selectedColorIndex].toLowerCase()] || product.images.yellow;

            return (
              <div key={index} className="carousel-item">
                <img src={selectedImage} alt={product.name} />
                <div className="productTitle">{product.name}</div>
                <div className="productPrice">${product.price} USD</div>
                <div className="color-options">
                  {colors.map((color, colorIndex) => (
                    <label key={colorIndex} className="radio-button">
                      <input
                        type="radio"
                        name={`color-${globalIndex}`}
                        value={color}
                        checked={selectedColor === color}
                        onChange={() => handleColorChange(globalIndex, color)} //call handleColorChange when the color change
                      />
                      <span
                        className="radio-custom"
                        style={{ backgroundColor: color }}
                      ></span>
                    </label>
                  ))}
                </div>
                <div className="colorOption">
                  {colorNames[selectedColorIndex]} Gold
                </div>
                <div className="productRating">
                <Rating
                  initialValue={product.popularityScore/20}
                  size={24}
                  activeColor="#E6CA97"
                  allowFraction={true} 
                  readonly={true} 
                />
                <span className="ratingText">
                  {(product.popularityScore/20).toFixed(1)}/5
                </span>
              </div>
              </div>
            );
          })}
        </div>
        <button className="next" onClick={nextPage}>
          {">"}
        </button>
      </div>
    </div>
  );
};

export default ProductsCarousel;
