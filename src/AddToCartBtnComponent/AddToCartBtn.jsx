import React, { useContext } from 'react';
import './AddToCartBtn.css';
import { useCart } from '../CartContextComponent/CartContext' // import the cart context
import { useNavigate } from 'react-router-dom';


// We expect each button to know WHICH product it's adding
// So we accept a "product" prop
function AddToCartBtn({ product, quantity, redirect=false }) {
  // Grab addToCart function from context
  const { addToCart } = useCart();
  const navigate = useNavigate();
  
  
  // Handle click event
  function handleAddToCart() {
    console.log("Add to cart product:", product);
    if(product.stock === 0) {
      alert("Product not in stock");
      return;
    }
    // Call the context function and pass the product
    addToCart(product, quantity);
    console.log("Add to cart product:", product);
    
    if (redirect) {
      navigate('/cart');
    }
  }

  return (
    <button id="add-to-cart-btn" onClick={handleAddToCart}>
      Add to Cart
    </button>
  );
}

export default AddToCartBtn;
