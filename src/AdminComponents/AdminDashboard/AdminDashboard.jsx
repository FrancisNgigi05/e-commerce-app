import React, { act, use, useEffect, useState } from 'react'
import { data, useNavigate } from 'react-router-dom';
import useLogout from '../../AuthenticationComponents/useLogout';
// import AdminNavbar from '../../AdminNavbar/AdminNavbar';
import './AdminDashboard.css';
import { API_URL } from '../../api';


function AdminDashboard() {
    const logout = useLogout();
    const [products, setProducts] = useState([]);
    const [registeredUsers, setRegisteredUsers] = useState([]);
    const [orders, setOrders] = useState([]);
    const [revenue, setRevenue] = useState(0);
    const [pendingPayments, setPendingPayments] = useState(0);
    const [activeUsers, setActiveUsers] = useState(0);

    // Fetching total users
    useEffect(() => {
        const fetchUsers =() => {
            fetch(`${API_URL}/users`)
                .then((r) => r.json())
                .then((data) => setRegisteredUsers(data))
                .catch((err) => console.error('Error fetching users:', Error))
        };
        fetchUsers();
        const interval = setInterval(fetchUsers, 10000); //update every 10s
        return () => clearInterval(interval); //avoid memory leaks

    }, [])
    const totalUsers = registeredUsers.length;

    //Fetching total orders
    useEffect(() => {
        const fetchOrders = () => {
            fetch(`${API_URL}/orders`)
                .then((r) => r.json())
                .then((data) => setOrders(data))
                .catch((err) => console.error("Error Fetching orders:", err))
        };
        fetchOrders();
        const interval = setInterval(fetchOrders, 10000);
        return () => clearInterval(interval);
    }, []);
    const totalOrders = orders.length;

    // Fetching total products
    useEffect(() => {
        const fetchProducts = () => {
            fetch(`${API_URL}/products`)
                .then((r) => r.json())
                .then((data) => setProducts(data))
                .catch((err) => console.error("Error fetching producsts:", err))
        };
        fetchProducts();
        const interval = setInterval(fetchProducts, 10000);
        return () => clearInterval(interval);
    }, []);

    const totalProducts = products.length;

    //Fetching pending payments
    useEffect(() => {
        const fetchPaidPayments = () => {
            fetch(`${API_URL}/orders`)
                .then((r) => r.json())
                .then((data) => {
                    console.log("All orders", data);
                    const paid = data.filter((st) => st.status === "paid");
                    console.log("All Paid orders:", paid);
                    
                    const totalPaid = paid.reduce((sum, order) => sum + order.total || 0, 0);
                    console.log(totalPaid);
                    setRevenue(totalPaid)
                })
        }
        fetchPaidPayments();
        const interval = setInterval(fetchPaidPayments, 10000);
        return () => clearInterval(interval);
    }, []);
    
    useEffect(() => {
        const fetchPendingPayments = () => {
            fetch(`${API_URL}/orders`)
                .then((r) => r.json())
                .then((data) => {
                    console.log("All orders", data);
                    const pending = data.filter((st) => st.status === "pending");
                    console.log("All Pending orders:", pending);
                    const totalPendingPayments = pending.reduce((sum, order) => sum + order.total || 0, 0);
                    console.log(totalPendingPayments);
                    setPendingPayments(totalPendingPayments)
                })
        }
        fetchPendingPayments();
        const interval = setInterval(fetchPendingPayments, 10000);
        return () => clearInterval(interval);
    }, []);


    //fetching active users
    useEffect(() => {
        const fetchingActiveUsers = () => {
            fetch(`${API_URL}/users`)
                .then((r) => r.json())
                .then((data) => {
                    // console.log("All users:", data);
                    const activeUsers = data.filter((us) => us.active === "active")
                    // console.log("All active users:", activeUsers);
                    setActiveUsers(activeUsers);
                })
        }
        fetchingActiveUsers();
        const interval = setInterval(fetchingActiveUsers, 10000);
        return () => clearInterval(interval);
    }, [])

    const totalActiveUsers = activeUsers.length;
    console.log(totalActiveUsers);
    
    
    

    return (
        <div className='admin-frame'>
            <div className='admin-display'>
                <div className="dashboard">
                    <h1 style={{fontSize: "4vh"}}>Welcome Admin!</h1>
                    <button onClick={logout} className='logout-btn'>Log out</button>
                </div>
            </div>
            <div className='admin-data-display'>
                <div className='registered-users display'>
                    <h1>Registered user(s)</h1>
                    <strong style={{fontSize: '3vh'}}>{totalUsers}</strong>
                </div>
                <div className='pending-payments display'>
                    <h1>Pending payment(s)</h1>
                    <strong style={{fontSize: '3vh'}}>${pendingPayments}</strong>
                </div>
                <div className="ordered-items display">
                    <h1>Total Order(s)</h1>
                    <strong style={{fontSize: '3vh'}}>{totalOrders}</strong>
                </div>
                <div className='total-revenue display'>
                    <h1>Total Revenue</h1>
                    <strong style={{fontSize: '3vh'}}>${revenue}</strong>
                </div>
                <div className='total-products display'>
                    <h1>Total Product(s)</h1>
                    <strong style={{fontSize: '3vh'}}>{totalProducts}</strong>
                </div>
                <div className='active-users display'>
                    <h1>Active User(s)</h1>
                    <strong style={{fontSize: '3vh'}}>{totalActiveUsers}</strong>
                </div>
            </div>
        </div>

    )
}

export default AdminDashboard
