import React, { useState, useEffect } from 'react'
import { API_URL } from '../api';

function AdminAddProduct() {
    const [categories, setCategories] = useState([]);
    const [newProduct, setNewProduct] = useState({
        image: "",
        name: "",
        category: "",
        description: "",
        rating: 0,
        stock: 0,
        price: 0,
    });

    function handleChange(e) {
        const {name, value} = e.target;
        setNewProduct({
            ...newProduct,
            [name]: value
        })
    }
    // useEffect(() => {
    // fetch(`${API_URL}/products`)
    //   .then(r => r.json())
    //   .then(data => {
    //     const allCategories = data.map(recipe => recipe.category);
    //     const uniqueCategories = [...new Set(allCategories)];
    //     setCategories(uniqueCategories);
    //   },[])

    useEffect(() => {
        fetch(`${API_URL}/products`)
          .then(r => r.json())
          .then(data => {
            const allCategories = data.map(recipe => recipe.category);
            const uniqueCategories = [...new Set(allCategories)];
            setCategories(uniqueCategories);
          });
    }, []);

    function handleSubmit(e) {
        e.preventDefault();

        fetch(`${API_URL}/products`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(newProduct)
        })
            .then((r) => {
                if(!r.ok) throw new Error("Error adding new product");
                return r.json();
            })
            .catch((err) => console.error(err))
    }

    return (
        <div>
            <h1>Add a new Product</h1>
            <form action="" onSubmit={handleSubmit} className='form'>
                <input
                    type="text"
                    name='image'
                    placeholder='Product-image'
                    value={newProduct.image}
                    onChange={handleChange}
                    required
                />
                <input
                    type="text"
                    name='name'
                    placeholder='Product-name'
                    value={newProduct.name}
                    onChange={handleChange}
                    required
                />
                <select
                    name="category"
                    value={newProduct.category}
                    onChange={handleChange}
                    required
                    >
                    <option value="">-- Select Category --</option>
                    {categories.map((cat, index) => (
                        <option key={index} value={cat}>{cat}</option>
                    ))}
            </select>
                <input 
                    type="text"
                    name='description'
                    placeholder='Product-description'
                    value={newProduct.description}
                    onChange={handleChange}
                    required
                />
                <input 
                    type="number"
                    name='rating'
                    placeholder='Product-rating'
                    value={newProduct.rating}
                    onChange={handleChange}
                    disabled
                    readOnly
                />
                <input 
                    type="number"
                    name='stock'
                    placeholder='Product-stock'
                    value={newProduct.stock}
                    onChange={handleChange}
                    min="0"
                    required
                />
                <input 
                    type="number"
                    name='price'
                    placeholder='Product-price'
                    value={newProduct.price}
                    onChange={handleChange}
                    min="0"
                    required
                />
                <button type='submit'>Add Product</button>
            </form>
        </div>
    )
}

export default AdminAddProduct
