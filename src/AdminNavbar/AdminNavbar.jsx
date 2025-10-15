import React from 'react'
import './AdminNavbar.css'
import { NavLink } from 'react-router-dom'

function AdminNavbar() {
  return (
    <div className='left-side-dashboard'>
        <NavLink to='/admin' end>Dashboard</NavLink>
        <NavLink to='/admin/orders'>Orders</NavLink>
        <NavLink to='//'>Products</NavLink>
        <NavLink to='//'>Customers</NavLink>
    </div>
  )
}

export default AdminNavbar
