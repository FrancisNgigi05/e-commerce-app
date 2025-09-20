import React, {useState, useEffect} from 'react'
import { Outlet } from 'react-router-dom'
import { API_URL } from '../api'
import GetUrsLogo from '../assets/GetUrsLogo.png'
import SearchBar from '../SearchComponent/SearchBar'
import { User, ShoppingCart, Phone } from 'lucide-react'

function Layout() {
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        fetch(`${API_URL}/products`)
        .then(r => r.json())
        .then(data => {
            const allCategories = data.map(recipe => recipe.category);
            const uniqueCategories = [...new Set(allCategories)];
            setCategories(uniqueCategories);
        })
        .catch(err => console.error("Error fetching data: ",err));
  }, []);

  const selectCategoriesDisplayed = categories.map((cat) => 
    <option key={cat} value={cat}>{cat}</option>
  )


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
                <img src={GetUrsLogo} alt="GetUrsLogo" id='logo'/>
                <select
                    name="categories"
                    id="categories"
                    onChange={(e) => {
                    const selected = e.target.value;
                    const section = document.getElementById(`section-${selected.replace(/\s+/g, '-')}`);
                    if(section) {
                        section.scrollIntoView({behavior: "smooth"});// smooth scroll
                    }
                    }}
                >
                    <option id='category-option'>Categories</option>
                    {selectCategoriesDisplayed}
                </select>
                <SearchBar />
                <User style={{width: '3vw', height: '3vh'}}/>
                </nav>
                <ShoppingCart style={{width: '3vw', height: '3vh'}} id='shopping-cart'/>
            </div>
            <Outlet />
        </>
  )
}

export default Layout;
