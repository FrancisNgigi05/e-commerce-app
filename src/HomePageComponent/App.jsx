import { useState, useEffect } from 'react'
import './App.css'
import FurnitureImage from '../assets/FurnitureImage.jpg'
import HandbagImage from '../assets/HandbagImage.jpg'
import SneakersImage from '../assets/SneakersImage.jpg'
import TechImage from '../assets/TechImage.jpg'
import TravelImage from '../assets/TravelImage.jpg'
import { API_URL } from '../api'
import { NavLink } from 'react-router-dom'
import GetUrsLogo from '../assets/GetUrsLogo.png'
import SearchBar from '../SearchComponent/SearchBar'
import { User, ShoppingCart, Phone } from 'lucide-react'


function App() {
  const [categories, setCategories] = useState([]);
  const [groupedProducts, setGroupedProducts] = useState({});

  const categoryImage = {
    "Hand Bag": HandbagImage,
    "Tech": TechImage,
    "Sneakers": SneakersImage,
    "Travel": TravelImage,
    "Furniture": FurnitureImage
  }

  useEffect(() => {
    fetch(`${API_URL}/products`)
      .then(r => r.json())
      .then(data => {
        const allCategories = data.map(recipe => recipe.category);
        const uniqueCategories = [...new Set(allCategories)];
        setCategories(uniqueCategories);

        // group products (max 7 per category)
        const grouped = data.reduce((acc, product) => {
          if(!acc[product.category]) {
            acc[product.category] = [];
          }
          if(acc[product.category].length < 7) {
            acc[product.category].push(product);
          }
          return acc;
        }, {});
        setGroupedProducts(grouped);
      })
      .catch(err => console.error("Error fetching data: ",err));
  }, []);

  console.log(categories);

  const categoriesImageDisplayed = categories.map((cat) => {
    return (
      <div className='category-card'>
        <img className='category-image'  src={categoryImage[cat]} alt={cat}/>
        <div className='category-text'>{cat}</div>
      </div>
    )
  })

  const selectCategoriesDisplayed = categories.map((cat) => 
    <option key={cat} value={cat}>{cat}</option>
  )

  const smallDisplay = Object.keys(groupedProducts).map((category) => (
    <div key={category} id={`section-${category.replace(/\s+/g, '-')}`}  className='category-preview'>
      <h2 className='category-heading'>{category}</h2>
      <div className='products-row'>
        {groupedProducts[category].map((prod) => (
          <div key={prod.id} className='product-card'>
            <img src={prod.image} alt={prod.name} id='product-image' />
            <div className='product-info'>
              <h4 id='product-name' className='product-item'>{prod.name}</h4>
              <p id='product-price' className='product-item'>${prod.price}</p>
            </div>
            <button id='add-to-cart-btn'>Add to Cart</button>
          </div>
        ))}
      </div>
    </div>
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
            <option id='category-option'>Category</option>
            {selectCategoriesDisplayed}
          </select>
          <SearchBar />
          <User style={{width: '3vw', height: '3vh'}}/>
        </nav>
        <ShoppingCart style={{width: '3vw', height: '3vh'}} id='shopping-cart'/>
      </div>
      
      <div className='hero-section'>
        <img id="home-page-image" src="https://wallpaperaccess.com/full/2593143.jpg" alt="Shopping logo" />
        <div className='hero-text'>
          <h1 id='home-heading'>Welcome to GETURS SHOP</h1>
          <p id='home-paragraph'>Disover the best deals today</p>
          <button id='learn-more-btn'>Learn more</button>
        </div>
      </div>
      <div className='outer-frame'>

        <h3 id='heading-three'>Shop Our Top Categories</h3>
        <div className='category-image-frame'>
          {categoriesImageDisplayed}
        </div>
      </div>

      {smallDisplay}
    </>
  )
}

export default App
