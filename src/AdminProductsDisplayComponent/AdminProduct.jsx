import React, { useEffect, useState } from 'react'
import './AdminProduct.css';
import { API_URL } from '../api';

function AdminProduct() {
    const [allProducts, setAllProducts] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [filterBy, setFilterBy] = useState("All")
    const producstPerPage = 5;

    const filteredProducts = allProducts.filter((pr) => {
        if (filterBy === "All") {
            return true;
        }
    })
    
    function handleChange(e) {
        setFilterBy(e.target.value);
        setCurrentPage(1)
    }
   
   
    // Fetching all products
    useEffect(() => {
       fetch(`${API_URL}/products`)
        .then((r) => r.json())
        .then((data) => setAllProducts(data))
        .catch((err) => console.error("Error fetching products:", err))
    },[])

    function handleDeleteProduct(id) {
        fetch(`${API_URL}/products/${id}`, {
            method: 'DELETE'
        })
            .then(() => console.log("Product Deleted Succesfully"))
        setAllProducts((pr) => pr.filter((pr) => pr.id !== id));
    }

    // Pagination Logic
    const indexOfLastOrder = currentPage * producstPerPage;
    const indexOfFirstOrder = indexOfLastOrder - producstPerPage;
    const currentProducts = filteredProducts.slice(indexOfFirstOrder, indexOfLastOrder);
    const totalPages = Math.ceil(filteredProducts.length/producstPerPage);

    const productsDisplay = currentProducts.map((product) => {
        return(
            <tr key={product.id}>
                <td><img className="admin-product-image" src={product.image} alt={product.name} /></td>
                <td>{product.name}</td>
                <td>{product.category}</td>
                <td>{product.price}</td>
                <td>{product.description}</td>
                <td>{product.stock}</td>
                <td>{product.rating}</td>
                <td><button onClick={() => handleDeleteProduct(product.id)} className='delete-order-btn'>Delete</button></td>
            </tr>
        )
    })

    const pageNumbers = [];

    for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
    }

    return (
        <div>
            <div className="order-heading">
                <h1 className='orders-heading'>Welcome to the Product Section!</h1>
                <select onChange={handleChange} className='select-order'>
                    <option value="All">--Sort By--</option>
                </select>
            </div>
            <table className='orders-table'>
                <thead>
                    <tr>
                        <th>Image</th>
                        <th>Name</th>
                        <th>Category</th>
                        <th>Price</th>
                        <th>Description</th>
                        <th>Stock</th>
                        <th>Rating</th>
                        <th>DeleteProduct</th>
                    </tr>
                </thead>
                    <tbody>
                        {productsDisplay}
                    </tbody>
            </table>
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

export default AdminProduct
