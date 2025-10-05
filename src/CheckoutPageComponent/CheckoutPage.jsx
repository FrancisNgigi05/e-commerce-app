import React from 'react'
import { useCart } from '../CartContextComponent/CartContext'
import { useNavigate } from 'react-router-dom';
import { API_URL } from '../api';
import './CheckoutPage.css'

function CheckoutPage({ total }) {
    // console.log(total);
    const {cart} = useCart();
    const navigate = useNavigate();

    const handlePlaceOrder = async () => {
        if(!cart.length) return alert("Cart is empty");
        const totalAmnt = total;
        const order = {
            userId: "2",
            items: cart.map(ci => ({productId: String(ci.productId), quantity: ci.quantity})),
            total: totalAmnt,
            status: 'pending',
            createdAt: new Date().toISOString().split("T")[0],
            paidAt: null
        };

        const res = await fetch(`${API_URL}/orders`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(order)
        });
        const savedOrder = await res.json();

        navigate(`/payment/${savedOrder.id}`);
    }



    return (
        <div className="checkout-page">
            <h2>Checkout</h2>
            <p>Your total is: ${total}</p>
            <button id='checkout-btn' onClick={handlePlaceOrder}>Proceed to Payment</button>
        </div>
    )
}

export default CheckoutPage
