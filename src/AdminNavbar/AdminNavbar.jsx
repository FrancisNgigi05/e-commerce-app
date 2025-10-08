import React from 'react'
import './AdminNavbar.css'
import { NavLink } from 'react-router-dom'

function AdminNavbar() {
  return (
    <div className='left-side-dashboard'>
        <NavLink to='/admin'>Dashboard</NavLink>
        <NavLink to='//'>Products</NavLink>
        <NavLink to='//'>Orders</NavLink>
        <NavLink to='//'>Customers</NavLink>
    </div>
  )
}

export default AdminNavbar
