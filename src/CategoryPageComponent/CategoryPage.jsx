import React, {useEffect, useState} from 'react'
import {Link, useParams } from 'react-router-dom';
import { API_URL } from '../api';
import ProductItem from './ProductItem';
import './CategoryPage.css'

function CategoryPage() {
  const [productsByCategory, setProductsByCategory] = useState([]);
  const [sortOption, setSortOption] = useState("");
  const {category} = useParams();

  useEffect(() => {
    fetch(`${API_URL}/products`)
      .then((r) => r.json())
      .then((data) => {
        const filteredData = data.filter((product) => product.category.toLowerCase() === category.toLocaleLowerCase())
        setProductsByCategory(filteredData)
      })
  }, [category])
  // console.log(productsByCategory);

  // sort products based on the selected option
  const sortedProducts = [... productsByCategory].sort((a,b) => {
    if(sortOption === "price-asc") return a.price - b.price; // Lowest to highest
    if(sortOption === "price-desc") return b.price - a.price; // highest to lowest
    if(sortOption === "rating") return b.rating - a.rating; //best to worts
    return 0;
  })



  const productsDisplayed = sortedProducts.map((prod) => (
      <Link
        style={{textDecoration: "none", color: "inherit"}} 
        to={`/product/${prod.category.toLowerCase()}/${prod.id}`}
        key={prod.id}
      >
        <ProductItem 
          price={prod.price} 
          image={prod.image} 
          key={prod.id} 
          stock={prod.stock} 
          rating={prod.rating} 
          description={prod.description} 
          name={prod.name}
          product={prod}
        />
      </Link>
    )
  )

  return (
    <div>
      <div style={{display: "flex", gap: "50vw", flexDirection: "row"}}>
        <h1 id='category-heading'>{category} Products For You!</h1> 
        {/* Sort Dropdown */}
        <select
          style={{height: "3vh", alignSelf:"center", width: "5vw", borderRadius: "10vw", fontSize: "1.5vh", textAlign: "center", marginTop: "9vh"}}
          id="sort"
          value={sortOption}
          onChange={(e) => setSortOption(e.target.value)}
        >
          <option value="">--Sort By--</option>
          <option value="price-asc">Price Asc</option>i
          <option value="price-desc">Price Desc</option>
          <option value="rating">Rating</option>
        </select>
      </div>
      
      <div className='item-display'>
        {productsDisplayed}
      </div>
    </div>
  )
}

export default CategoryPage;
