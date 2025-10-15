import React, { useEffect, useState } from 'react'
import './AdminOrders.css'
import { API_URL } from '../api';

function AdminOrders() {
    const [allOrders, setAllOrders] = useState([]);

    // Fetching all orders
    useEffect(() => {
        
        const fetchAllOrders = () => {
            fetch(`${API_URL}/orders`)
                .then((r) => r.json())
                .then((data) => {
                    console.log("All orders:", data);
                    setAllOrders(data);
                })
                .catch((err) => console.error("Error fetching orders:", err))
        }
        fetchAllOrders();
        const interval = setInterval(fetchAllOrders, 10000);
        return () => clearInterval(interval);
    },[]);

    function handleDeleteOrder(id) {
        fetch(`${API_URL}/orders/${id}`, {
            method: 'DELETE'
        })
            .then(() => console.log("Order deleted succesfully"))
        setAllOrders((ord) => ord.filter((or) => or.id !== id));
    }

    const ordersDisplay = allOrders.map((ord) => 
        <tr>
            <td>{ord.id}</td>
            <td>{ord.userId}</td>
            <td>{ord.items.length}</td>
            <td>${ord.total}</td>
            <td>{ord.status}</td>
            <td>{ord.createdAt}</td>
            <td className='delete-cell'>
                <button onClick={() => handleDeleteOrder(ord.id)} className='delete-order-btn'>Delete</button>
            </td>
        </tr>
    );

    return (
        <div>
            <h1 className='orders-heading'>Welcome to the Orders Section!</h1>
            <table className='orders-table'>
                <thead>
                    <tr>
                        <th>OrderId</th>
                        <th>UserId</th>
                        <th>Total Items</th>
                        <th>Total Amount</th>
                        <th>Status</th>
                        <th>Date</th>
                        <th>DeletOrder</th>
                    </tr>
                </thead>
                <tbody>
                    {/* <tr>
                        <td>1</td>
                        <td>1</td>
                        <td>5</td>
                        <td>${100}</td>
                        <td>paid</td>
                        <td>2020/05/01</td>
                    </tr>
                    <tr>
                        <td>1</td>
                        <td>1</td>
                        <td>5</td>
                        <td>${100}</td>
                        <td>pending</td>
                        <td>2020/05/01</td>
                    </tr> */}
                    {ordersDisplay}
                </tbody>
            </table>
        </div>
    )
}

export default AdminOrders
