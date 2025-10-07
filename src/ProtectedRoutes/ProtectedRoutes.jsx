import React from 'react'
import { Outlet, Navigate } from 'react-router-dom'

function ProtectedRoutes({ allowedRoles }) {
    const storedUser = localStorage.getItem("user");
    const user = storedUser ? JSON.parse(storedUser) : null;

    if(!user) {
        // Not logged in
        return <Navigate to='/login' replace/>
    }
    if (allowedRoles && !allowedRoles.includes(user.role)) {
        // logged in but not allowed(rong role)   
        return <Navigate to='/unauthorized' replace/>
    }
    // Authorized
    return <Outlet />;
}

export default ProtectedRoutes
