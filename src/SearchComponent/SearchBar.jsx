import React, { useState, useEffect } from 'react'
import './SearchBar.css'
import { API_URL } from '../api';
import { Link } from 'react-router-dom';

function SearchBar() {
    const [products, setProducts] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [filtered, setFiltered] = useState([]);
    const [popular, setPopular] = useState([]);
    const [isFocused, setIsFocused] = useState(false);

    // fetch products + compute popular products
    useEffect(() => {
        fetch(`${API_URL}/products`)
            .then(r => r.json())
            .then(data => {
                setProducts(data);

                // Get one highest rated product per category
                const popularByCategory = {};
                data.forEach((item) => {
                    const cat = item.category;
                    if (!popularByCategory[cat] || item.rating > popularByCategory[cat].rating) {
                        popularByCategory[cat] = item;
                    }
                });
                setPopular(Object.values(popularByCategory));
            })
            .catch(err => console.error('Error fetching products:', err));
    }, []);

    // Handle Search filtering
    useEffect(() => {
        if (searchTerm.trim() === "") {
            setFiltered([]);
            return;
        }
        const results = products.filter(prod =>
            prod.name.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFiltered(results);
    }, [searchTerm, products]);

    return (
        <div className='search-container'>
            <input
                type="text"
                placeholder='🔍     Search Product...'
                onChange={(e) => setSearchTerm(e.target.value)}
                className='search-input'
                onFocus={() => setIsFocused(true)}
                onBlur={() => setTimeout(() => setIsFocused(false), 150)}
            />
            {/* Dropdown results */}
            {isFocused && (
                <div className='search-dropdown'>
                    {searchTerm.trim() === "" ? (
                        <>
                            <p className='dropdown-title'>Popular products</p>
                            <div className='popular-product-display'>
                                {popular.map(prod => (
                                    <Link
                                        key={prod.id}
                                        to={`/product/${prod.category.toLowerCase()}/${prod.id}`}
                                        className='dropdown-item'
                                    >
                                        <img src={prod.image} alt={prod.name} className='dropdown-img' />
                                        <div className='extra-info'>
                                            <span style={{fontSize: "2vh", fontWeight:"bold"}}>{prod.name}</span>
                                            <span className='stock'>{prod.stock} item(s) Available</span>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        </>
                    ) : filtered.length > 0 ? (
                        <div className='filter-product-display'>
                            {filtered.map((prod) => (
                                <Link
                                    key={prod.id}
                                    to={`/product/${prod.category.toLowerCase()}/${prod.id}`}
                                    className='dropdown-filtered-item'
                                >
                                    <div className='extra-filtered-info'>
                                        <div id='img-name'>
                                            <img src={prod.image} alt={prod.name} className='dropdown-filtered-img' />
                                            <span style={{fontSize: "2vh", fontWeight:"bold"}}>{prod.name}</span>
                                        </div>
                                        <span id="dropdown-price">${prod.price}</span>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    ) : (
                        <div className='dropdown-item'>No results found</div>
                    )}
                </div>
            )}
        </div>
    )
}

export default SearchBar;
