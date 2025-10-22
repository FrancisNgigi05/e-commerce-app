import React, { useEffect, useState } from 'react'
import './AdminOrders.css'
import { API_URL } from '../api';

function AdminOrders() {
    const [allOrders, setAllOrders] = useState([]);
    const [filterBy, setFilterBy] = useState("All");
    const [currentPage, setCurrentPage] = useState(1);
    const ordersPerPage = 8;

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

    function handleChange(e) {
        setFilterBy(e.target.value);
        setCurrentPage(1);
    }

    const filteredOrders = allOrders.filter((or) => {
        if(filterBy === "All") {
            return true;
        }
        else {
            return filterBy === or.status;
        }
    });

    // Pagination logic
    const indexOfLastOrder = currentPage * ordersPerPage;
    const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
    const currentOrders = filteredOrders.slice(indexOfFirstOrder, indexOfLastOrder);
    const totalPages = Math.ceil(filteredOrders.length / ordersPerPage);


    const ordersDisplay = currentOrders.map((ord) => 
        <tr key={ord.id}>
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

    // Page numbers
    const pageNumbers = [];
    for (let i = 1; i <= totalPages; i++ ) {
        pageNumbers.push(i);
    }

    return (
        <div>
            <div className='order-heading'>
                <h1 className='orders-heading'>Welcome to the Orders Section!</h1>
                <select onChange={handleChange} className='select-order'>
                    <option value="All">--Sort By--</option>
                    <option value="pending">Pending</option>
                    <option value="paid">Paid</option>
                </select>
            </div>
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

export default AdminOrders
