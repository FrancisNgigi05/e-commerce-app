import React, { useState, useEffect } from 'react'
import { Outlet, Link } from 'react-router-dom'
import { API_URL } from '../api'
import GetUrsLogo from '../assets/GetUrsLogo.png'
import SearchBar from '../SearchComponent/SearchBar'
import { User, ShoppingCart, Phone } from 'lucide-react'
import useLogout from '../AuthenticationComponents/useLogout'

function Layout() {
    const [categories, setCategories] = useState([]);
    const logout = useLogout();

    useEffect(() => {
        fetch(`${API_URL}/products`)
            .then(r => r.json())
            .then(data => {
                const uniqueCategories = [...new Set(data.map(item => item.category))];
                setCategories(uniqueCategories);
            })
            .catch(err => console.error("Error fetching data: ", err));
    }, []);

    const selectCategoriesDisplayed = categories.map((cat) => (
        <option key={cat} value={cat}>{cat}</option>
    ))

    return (
        <>
            <div className='top-display'>
                <div id="phone-details">
                    <Phone style={{width: '1vw', height: '2vh'}} />
                    <p id='number'>+25443303286</p>
                </div>
                <div id='info-shop'>
                    <p>Get 50% Off on Selected Items</p>
                    <p>|</p>
                    <p>Shop Now</p>
                </div>
            </div>

            <div className='nav-display'>
                <nav className='nav-container'>
                    <Link to={'/'}>
                        <img src={GetUrsLogo} alt="GetUrsLogo" id='logo'/>
                    </Link>

                    <select
                        name="categories"
                        id="categories"
                        onChange={(e) => {
                            const selected = e.target.value;
                            const section = document.getElementById(`section-${selected.replace(/\s+/g, '-')}`);
                            if(section) section.scrollIntoView({behavior: "smooth"});
                        }}
                    >
                        <option id='category-option'>Categories</option>
                        {selectCategoriesDisplayed}
                    </select>

                    <SearchBar />

                    <User style={{width: '3vw', height: '3vh'}}/>
                    <Link to='/cart' style={{color: 'inherit'}}>
                        <ShoppingCart style={{width: '3vw', height: '3vh'}} id='shopping-cart'/>
                    </Link>

                    {/* Fix: added a wrapper div so logout button fits without breaking layout */}
                    <div style={{display: 'flex', alignItems: 'center'}}>
                        <button 
                            onClick={logout} 
                            style={{padding: '0.3vw 0.5vw' , borderRadius: '2vh'}}
                            className='logout-btn'
                        >
                            LogOut
                        </button>
                    </div>
                </nav>
            </div>

            <Outlet />
        </>
    )
}

export default Layout
