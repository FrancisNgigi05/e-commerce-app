import { useNavigate } from "react-router-dom";
import { useCart } from "../CartContextComponent/CartContext";
import { useEffect, useCallback } from "react";
import { API_URL } from "../api";

const useLogout = () => {
  const { setCart } = useCart();
  const navigate = useNavigate();

  const logout = useCallback(async () => {
    try {
      const storedUser = JSON.parse(localStorage.getItem("user"));
      
      if(storedUser?.id) {
        await fetch(`${API_URL}/users/${storedUser.id}`, {
          method: 'PATCH',
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({active: "inactive"}),
        });
      }

      localStorage.removeItem("token");
      localStorage.removeItem("user");
  
      // Clear app state
      setCart([]);
  
      // Navigate after logout
      navigate("/login");
    } catch (error){
      console.error("Error during logout:", error);
      
    }
    // Clear local storage or tokens
  }, [setCart, navigate]);

  return logout;
};

export default useLogout;


// import React from 'react'
// import { useNavigate } from 'react-router-dom'
// import { useCart } from '../CartContextComponent/CartContext';
// import { API_URL } from '../api';


// export function useLogout() {
//     const navigate = useNavigate();
//     const {setLoggedInUser, setCart, loggedInUser} = useCart()
    
//     const logout = async () => {
//         if(loggedInUser) {
//             try {
//                 await fetch(`${API_URL}/users/${loggedInUser.id}`, {
//                     method: 'PATCH',
//                     headers: {
//                         "Content-Type": "application/json",
//                     },
//                     body: JSON.stringify({active: "inactive"}),
//                 });
//             }catch(err)  {console.error('Failed to update user status:', err)};
//         }
//     }
//     // Clear user session
//     localStorage.removeItem("user");
//     setLoggedInUser(null);
//     setCart([]);
//     navigate('/login')

//     return logout;
// }