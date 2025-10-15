import React from 'react'
import { useCart } from '../CartContextComponent/CartContext'
import { useNavigate } from 'react-router-dom';
import { API_URL } from '../api';
import './CheckoutPage.css'

function CheckoutPage({ total }) {
    // console.log(total);
    const {cart} = useCart();
    const navigate = useNavigate();
    const loggedInUser = JSON.parse(localStorage.getItem("user"))

    const handlePlaceOrder = async () => {
        if (!cart.length) return alert("Cart is empty");

        const totalAmnt = total;
        const userId = loggedInUser.id;

        // Fetch all orders (since json-server might not support query filters)
        const res = await fetch(`${API_URL}/orders`);
        const allOrders = await res.json();

        // Find if this user already has a pending order
        const pendingOrder = allOrders.find(o => o.userId === userId && o.status === "pending");

        const orderData = {
            userId,
            items: cart.map(ci => ({
            productId: String(ci.productId),
            quantity: ci.quantity,
            })),
            total: totalAmnt,
            status: "pending",
            createdAt: new Date().toISOString().split("T")[0],
            paidAt: null,
        };

        if (pendingOrder) {
            // 3️⃣ Update existing pending order
            await fetch(`${API_URL}/orders/${pendingOrder.id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(orderData),
            });

            navigate(`/payment/${pendingOrder.id}`);
        } else {
            // 4️⃣ Otherwise, create new
            const newOrderRes = await fetch(`${API_URL}/orders`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(orderData),
            });
            const savedOrder = await newOrderRes.json();

            navigate(`/payment/${savedOrder.id}`);
        }
    };



    return (
        <div className="checkout-page">
            <h2>Checkout</h2>
            <p>Your total is: ${total}</p>
            <button id='checkout-btn' onClick={handlePlaceOrder}>Proceed to Payment</button>
        </div>
    )
}

export default CheckoutPage
