import React from 'react'
import { useNavigate } from 'react-router-dom';
import { useLogout } from '../../AuthenticationComponents/useLogout';
import AdminNavbar from '../../AdminNavbar/AdminNavbar';
import './AdminDashboard.css';


function AdminDashboard() {
    const logout = useLogout();
    return (
        <div className='admin-frame'>
            <div className='admin-display'>
                <div className="dashboard">
                    <h1 style={{fontSize: "4vh"}}>Welcome Admin!</h1>
                    <button onClick={logout} className='logout-btn'>Log out</button>
                </div>
            </div>
            <div>users</div>
        </div>

    )
}

export default AdminDashboard
