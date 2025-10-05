import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { API_URL } from '../api';
import { useCart } from '../CartContextComponent/CartContext';

function Payment() {
  const {id} = useParams();
  const [order, setOrder] = useState([]);
  const navigate = useNavigate();
  const {setCart, cart} = useCart();

  useEffect(() => {
    fetch(`${API_URL}/orders/${id}`)
      .then(r => r.json())
      .then(setOrder)
      .catch(err => {
        console.error(err);
        alert("Failed to fetch order details");
        navigate('/');
      })
  }, [id])

  const handleConfirmPayment = async () => {
    if(!order) return;

    const res = await fetch(`${API_URL}/orders/${id}`, {
      method: 'PATCH',
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({status: 'paid', paidAt: new Date().toISOString()})
    });

    const updated = await res.json();

    // decrement stock for each product
    for(const item of updated.items) {
      // console.log(item);
      console.log(updated.items)
      
      const prodRes = await fetch(`${API_URL}/products/${item.productId}`);
      const product = await prodRes.json();
      const newStock = Math.max(0, (product.stock || 0) - item.quantity);

      await fetch(`${API_URL}/products/${item.productId}`, {
        method: 'PATCH',
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({stock: newStock})
      });
    }

    
    // Delete cart items from the paid order (backend)
    await Promise.all(
      updated.items.map((item) => {
        const cartItem = cart.find(c => c.productId === item.productId && c.userId === order.userId);
        if(!cartItem) return Promise.resolve();
        return fetch(`${API_URL}/cart/${cartItem.id}`, {method: "DELETE"})
      })
    )

    // Suppose updated.items contains the products that were just paid for
    const paidItems = updated.items;  

    // Create an array of only the productIds of the paid items
    const paidProductIds = paidItems.map(item => item.productId);

    // Filter the cart to remove any item whose productId is in the paidProductIds array
    const newCart = cart.filter(cartItem => {
      // Check if this cart item was paid
      const isPaid = paidProductIds.includes(cartItem.productId);

      // If it's paid, we DON'T want it in the cart, so return false
      // If it's not paid, we want it to stay in the cart, so return true
      return !isPaid;
    });

    // Update the state with the filtered cart
    setCart(newCart);

    // ADVANCE CODE
    // setCart(prevCart => prevCart.filter(cartItem => !updated.items.some(item => item.productId === cartItem.productId)));
    alert("Payment successful! Thank you for your purchase.");
    navigate('/');
  }



  return (
    <div style={{display: "flex", flexDirection: "column", alignItems: "center", marginTop: "10vh", height: "40vh", gap: "5vh", border: "2px solid lightgrey", borderRadius: "10px", width: "30vw", margin: "auto", padding: "2vw"}}>
      <h2>Fake payment for Order #{order.id}</h2>
      <p>Total: ${order.total}</p>
      <p>Status: {order.status}</p>
      <button onClick={handleConfirmPayment}>Confirm payment (fake)</button>
    </div>
  )
}

export default Payment
