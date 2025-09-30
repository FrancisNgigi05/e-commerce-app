import React, { useState, useEffect } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { API_URL } from '../api';
import BuyNowbtn from '../BuyNowComponent/BuyNowbtn';
import './ProductDetail.css'
import AddToCartBtn from '../AddToCartBtnComponent/AddToCartBtn';
import ItemCounter from '../ItemCounterComponent/ItemCounter';
import ProductItem from '../CategoryPageComponent/ProductItem';

function ProductDetail() {
    // const params = useParams();
    const {id: productId} = useParams();
    const {category: productCategory} = useParams();
    const [productDetail, setProductDetail] = useState(null);
    const [similarProducts, setSimilarProducts] = useState([]);
    const [counter, setCounter] = useState(1);

    useEffect(() => {
        fetch(`${API_URL}/products/${productId}`)
            .then(r => r.json())
            .then(data => {
                setProductDetail(data);
            })   
    }, [productId]);

    useEffect(() => {
        if(!productCategory) return;

        fetch(`${API_URL}/products`)
            .then(r => r.json())
            .then(data => {
                const filtered = data.filter((product) => product.category.toLowerCase() === productCategory.toLowerCase());
                //sort by rating descending
                const sorted = filtered.sort((a, b) => b.rating - a.rating);
                //take top 8
                const top8 = sorted.slice(0, 8)

                setSimilarProducts(top8);
            })

    }, [productCategory]);


    const productsDisplayed = similarProducts.map((prod) => (
        <Link style={{textDecoration: "none", color: "inherit"}} to={`/product/${prod.category.toLowerCase()}/${prod.id}`} key={prod.id}>
            <ProductItem price={prod.price} image={prod.image} key={prod.id} stock={prod.stock} rating={prod.rating} description={prod.description} name={prod.name} product={prod} />
        </Link>
    ))
    

    return (
        <div className='outer-frame'>
            <div className='inner-frame'>
                <img src={productDetail?.image} alt={productDetail?.description} className='image-detail'/>
                <div className='right-side-details'>
                    <h2 className='heading-detail'>{productDetail?.name}</h2>
                    <em className='description-detail'>{productDetail?.description}</em>
                    <strong className='price-detail'>${productDetail?.price}</strong>
                    <div className='stock-detail'>
                       <ItemCounter counter={counter} increment={() => setCounter(c => c+1)} decrement={() => setCounter(c => Math.max(c-1,0))}/>
                        <p id='stock-detail-paragraph'>Only <em className='emphasis'>{productDetail?.stock} items</em> left</p>
                    </div>
                    <div className='btn-details'>
                        <BuyNowbtn />
                        <AddToCartBtn  product={productDetail} quantity={counter} redirect/>
                    </div>
                </div>
            </div>
            <h3 className='heading-three'>Similar Items You Might Like!</h3>
            <div className='products-display'>
                {productsDisplayed}
            </div>
        </div>
    )
}

export default ProductDetail