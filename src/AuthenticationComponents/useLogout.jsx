import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useCart } from '../CartContextComponent/CartContext';

export function useLogout() {
    const navigate = useNavigate();
    const {setLoggedInUser, setCart} = useCart()
    
    const logout = () => {
        localStorage.removeItem("user");
        setLoggedInUser(null);
        setCart([])
        navigate('/login');
    }

    return logout;
}