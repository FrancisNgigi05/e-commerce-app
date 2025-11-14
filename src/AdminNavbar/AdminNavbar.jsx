import React from 'react'
import './AdminNavbar.css'
import { NavLink } from 'react-router-dom'

function AdminNavbar() {
  return (
    <div className='left-side-dashboard'>
        <NavLink to='/admin' end>Dashboard</NavLink>
        <NavLink to='/admin/orders'>Orders</NavLink>
        <NavLink to='/admin/products'>Products</NavLink>
        <NavLink to='/admin/customers'>Customers</NavLink>
    </div>
  )
}

export default AdminNavbar
