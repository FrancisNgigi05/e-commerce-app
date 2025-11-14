import React, {useState, useEffect, useMemo} from 'react'
import { API_URL } from '../api';
import './AdminViewCustomers.css';

function AdminViewCustomers() {
    const [users, setUsers] = useState([]);
    const [orders, setOrders] = useState([]);
    const[currentPage, setCurrentPage] = useState(1);
    const customersPerPage = 8;




    // Fetch customers data that have made an order
    useEffect(() => {
        fetch(`${API_URL}/users`)
            .then((r) => r.json())
            .then((data) => {
                console.log("Here are the customers:", data);
                setUsers(data) 
            })
    }, [])

    // Fetch userId in the orders
    useEffect(() => {
        fetch(`${API_URL}/orders`)
            .then((r) => r.json())
            .then((data) => {
                console.log("Here are the orders:", data);
                setOrders(data) 
            })
    }, [])

    const usersWhoOrdered = useMemo(() => {
        const orderUserIds = new Set(orders.map(order => order.userId));
        return users.filter(user => orderUserIds.has(user.id));
    }, [users, orders]);
    
    // Pagination logic
    const indexOfLastOrder = currentPage * customersPerPage;
    const indexOfFirstOrder = indexOfLastOrder - customersPerPage;
    const currentCustomers = usersWhoOrdered.slice(indexOfFirstOrder, indexOfLastOrder);
    const totalPages = Math.ceil(usersWhoOrdered.length / customersPerPage);


    const usersWhoMadeOrdersList = currentCustomers.map((u) => {
        return (
            <tr key={u.id}>
                <td>{u.id}</td>
                <td>{u.username}</td>
                <td>{u.active}</td>
            </tr>
        )
    })

   // Page numbers
    const pageNumbers = [];
    for (let i = 1; i <= totalPages; i++ ) {
        pageNumbers.push(i);
    }
    
    return (
        <div>
            <div className='order-heading'> 
                <h1 className='orders-heading'>Customers who made orders</h1>
            </div>
            <table className='orders-table' style={{marginTop: "5vh"}}>
                <thead>
                    <tr>
                        <th>User ID</th>
                        <th>Username</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody>
                    {usersWhoMadeOrdersList}
                </tbody>
            </table>
            {/* Pagination Controls */}
            <div className='pagination'>
                    <button
                        onClick={() => setCurrentPage((prev) => Math.max(prev-1, 1))}
                        disabled={currentPage === 1}
                        className='pagination-btn'
                        >
                        « Prev
                    </button>
                    <div className='page-numbers'>
                            {pageNumbers.map((num =>(
                                
                                <button
                                key={num}
                                onClick={() => setCurrentPage(num)}
                                className={`page-btn ${currentPage === num ? 'active' : ''}`}
                                >
                                    {num}
                                </button>
                            )))}
                    </div>
                    <button
                        onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                        disabled={currentPage === totalPages}
                        className="pagination-btn"
                        >
                        Next »
                    </button>
                </div>
        </div>
    )
}

export default AdminViewCustomers
