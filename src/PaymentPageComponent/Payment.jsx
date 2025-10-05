import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { API_URL } from '../api';

function Payment() {
  const {id} = useParams();
  const [order, setOrder] = useState([]);
  const navigate = useNavigate();

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
    alert("Payment successful! Thank you for your purchase.");
    navigate('/');
  }



  return (
    <div style={{display: "flex", flexDirection: "column", alignItems: "center", marginTop: "7vh", height: "80vh", gap: "3vh", border: "2px solid lightgrey", borderRadius: "10px", width: "50vw", margin: "auto", padding: "2vw"}}>
      <h2>Fake payment for Order #{order.id}</h2>
      <p>Total: ${order.total}</p>
      <p>Status: {order.status}</p>
      <button onClick={handleConfirmPayment}>Confirm payment (fake)</button>
    </div>
  )
}

export default Payment
