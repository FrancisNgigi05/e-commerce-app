import React, { useEffect, useState } from "react";
import { useCart } from "../CartContextComponent/CartContext";
import { API_URL } from "../api";
import CheckoutPage from "../CheckoutPageComponent/CheckoutPage";
import './CartPage.css'

function CartPage() {
  const { cart, setCart } = useCart();
  const [products, setProducts] = useState([]);

  // Fetch all products once
  useEffect(() => {
    fetch(`${API_URL}/products`)
      .then((r) => r.json())
      .then((data) => setProducts(data))
      .catch((err) => console.error("Error fetching products:", err));
  }, []);

  function handleDelete(id) {
    fetch(`${API_URL}/cart/${id}`, { method: "DELETE" })
      .then((r) => {
        if (!r.ok) throw new Error("Failed to delete item");
        setCart((prevCart) => prevCart.filter((item) => String(item.id) !== String(id)));
      })
      .catch((err) => console.error(err));
  }

  function handleQuantityChange(id, newQuantity) {
    if (newQuantity < 1) return;
    setCart(prevCart => prevCart.map(item => String(item.id) === String(id) ? {...item, quantity: newQuantity} : item));
    
    fetch(`${API_URL}/cart/${id}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({quantity: newQuantity})
    })
        .catch(err => console.error(err))
  }

  const totalPrice = cart.reduce((sum, item) => {
    const product = products.find(p => String(p.id) === String(item.productId));
    if (!product) return sum;
    return sum + product.price * item.quantity;
  }, 0);

  return (
    <div style={{ margin: "2vw" }}>
      <h2 style={{marginBottom: '2vh'}}>Your Cart</h2>

      {cart.length === 0 ? (
        <p>No items yet</p>
      ) : (
        <div className="cart-container">
          <div style={{flex: 2}}>
            <table
            style={{
                width: "50%",
                borderCollapse: "collapse",
                textAlign: "left",
                marginBottom: '3vh'
            }}
            >
            <thead>
                <tr>
                <th style={{ borderBottom: "0.2vh solid #ccc", padding: "0.5vw" }}>Product</th>
                <th style={{ borderBottom: "0.2vh solid #ccc", padding: "0.5vw" }}>Price</th>
                <th style={{ borderBottom: "0.2vh solid #ccc", padding: "0.5vw" }}>Quantity</th>
                <th style={{ borderBottom: "0.2vh solid #ccc", padding: "0.5vw" }}>Total</th>
                <th style={{ borderBottom: "0.2vh solid #ccc", padding: "0.5vw" }}>Action</th>
                </tr>
            </thead>
            <tbody>
                {cart.map((item) => {
                const product = products.find((p) => String(p.id) === String(item.productId));
                if (!product) return null;

                return (
                    <tr key={item.id} style={{ borderBottom: "0.2vh solid #eee" }}>
                    <td style={{ padding: "0.2", display: "flex", alignItems: "center", gap: "0.5vw", marginTop: '3vh', marginBottom:'3vh'}}>
                        <img
                        src={product.image}
                        alt={product.name}
                        style={{ width: "5vw", height: "8vh", objectFit: "cover", borderRadius: "0.5vh" }}
                        />
                        <strong>{product.name}</strong>
                    </td>
                    <td style={{ padding: "0.2vw" }}>${product.price}</td>
                    <td style={{ padding: "0.2vw", gap: '1vw'}}>
                        <button onClick={() => handleQuantityChange(item.id, item.quantity - 1)} style={{marginRight: '0.5vw', width: '1vw'}}>-</button>
                            {item.quantity}
                        <button onClick={() => handleQuantityChange(item.id, item.quantity + 1)} style={{marginLeft: '0.5vw', width: '1vw'}}>+</button>
                    </td>
                    <td style={{ padding: "0.2vw" }}>${product.price * item.quantity}</td>
                    <td style={{ padding: "0.2vw" }}>
                        <button onClick={() => handleDelete(item.id)}>Remove</button>
                    </td>
                    </tr>
                );
                })}
            </tbody>
            </table>
            <div style={{fontWeight: 'bold', fontSize: '3vh'}}>
                Total:  ${totalPrice}
            </div>
          </div>
          <div style={{flex: 1}}>
            <CheckoutPage total={totalPrice}/>
          </div>
        </div>
      )}
    </div>
  );
}

export default CartPage;
