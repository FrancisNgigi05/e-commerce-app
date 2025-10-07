import React from 'react'
import { useNavigate } from 'react-router-dom';
import { useLogout } from '../../AuthenticationComponents/useLogout';


function AdminDashboard() {
    const navigate = useNavigate();
    return (
        <div>
        <h1>ADMIN</h1>
        <button onClick={logout}>Log out</button>
        </div>
    )
}

export default AdminDashboard
