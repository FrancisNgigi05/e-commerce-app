import { UserPen } from 'lucide-react';
import React, {useEffect, useState} from 'react'
import { data, Link, useParams } from 'react-router-dom';
import { API_URL } from '../api';
import ProductItem from './ProductItem';
import './CategoryPage.css'

function CategoryPage() {
  const [productsByCategory, setProductsByCategory] = useState([]);
  const {category} = useParams();

  useEffect(() => {
    fetch(`${API_URL}/products`)
      .then((r) => r.json())
      .then((data) => {
        // console.log(data);
        const filteredData = data.filter((product) => product.category.toLowerCase() === category.toLocaleLowerCase())
        // console.log(filteredData);
        setProductsByCategory(filteredData)
      })
  }, [category])
  // console.log(productsByCategory);
  
  const productsDisplayed = productsByCategory.map((prod) => (
      <Link style={{textDecoration: "none", color: "inherit"}} to={`/product/${prod.category.toLowerCase()}/${prod.id}`} key={prod.id}>
        <ProductItem price={prod.price} image={prod.image} key={prod.id} stock={prod.stock} rating={prod.rating} description={prod.description} name={prod.name}/>
      </Link>
    )
  )


  return (
    <div>
      <h1 id='category-heading'>{category} Products For You!</h1>
      <div className='item-display'>
        {productsDisplayed}
      </div>
    </div>
  )
}

export default CategoryPage;
