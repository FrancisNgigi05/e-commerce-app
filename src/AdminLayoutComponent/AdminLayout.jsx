import React from 'react'
import { Outlet, useNavigate } from 'react-router-dom';
import { useLogout } from '../AuthenticationComponents/useLogout';
import AdminNavbar from '../AdminNavbar/AdminNavbar';
import './AdminLayout.css';


function AdminLayout() {
    const logout = useLogout();
    return (
        <div className='admin-frame'>
            <div className='admin-display'>
                <AdminNavbar />
                <Outlet />
            </div>
        </div>
    )
}

export default AdminLayout;