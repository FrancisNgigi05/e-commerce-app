import React, { createContext, useContext, useState, useEffect } from "react";
import { API_URL } from "../api";

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);

  // Load cart on mount
  useEffect(() => {
    fetch(`${API_URL}/cart`)
      .then((r) => r.json())
      .then((data) => setCart(data))
      .catch((err) => console.error("Error loading cart:", err));
  }, []);

  const addToCart = async (product, quantity = 1) => {
    try {
      // Check if item already exists in cart
      const existingItem = cart.find(
        (item) => String(item.productId) === String(product.id)
      );

      if (existingItem) {
        // If exists, update quantity with PATCH
        const updatedItem = {
          ...existingItem,
          quantity: existingItem.quantity + quantity,
        };

        await fetch(`${API_URL}/cart/${existingItem.id}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ quantity: updatedItem.quantity }),
        });

        // Update local state
        setCart((prev) =>
          prev.map((item) =>
            item.id === existingItem.id ? updatedItem : item
          )
        );
      } else {
        // If not exists, create new cart item
        const newItem = {
          productId: product.id,
          quantity,
        };

        const res = await fetch(`${API_URL}/cart`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(newItem),
        });

        const saved = await res.json();

        setCart((prev) => [...prev, saved]);
      }
    } catch (err) {
      console.error("Error adding to cart:", err);
    }
  };

  const setQuantityInCart = (productId, quantity) => {
    setCart((prev) =>
      prev.map((item) =>
        String(item.productId) === String(productId)
          ? { ...item, quantity }
          : item
      )
    );
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, setQuantityInCart, setCart }}>
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => useContext(CartContext);
