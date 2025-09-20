import React from 'react'
import AddToCartBtn from '../AddToCartBtnComponent/AddToCartBtn'
import './ProductItem.css'

function ProductItem( {image, price, description, stock, rating, name} ) {
  return (
    <div className='outer-image-frame'>
      <div className='full-item'>
      <img className='product-image' src={image} alt={description}/>

        <div className='product-info'>
            <h4 id='product-name' className='product-item'>{name}</h4>
            <p id='product-price' className='product-item'>${price}</p>
        </div>
        <div>

        </div>
        <p id='description'>{description}</p>
        <p id='stock'>In Stock: {stock} items</p>
        <p id='rating'>Rating: {rating}</p>
        <AddToCartBtn />
      </div>
    </div>
  )
}

export default ProductItem
