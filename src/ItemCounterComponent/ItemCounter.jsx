import React, { useState } from 'react'
import './ItemCounter.css'

function ItemCounter( {counter, increment, decrement} ) {
    // const [counter, setCounter] = useState(0);
    // const increment = () => setCounter(counter + 1)
    // const decrement = () => setCounter (prev => (prev > 0 ? prev - 1 : 0));

    return (
        <div className='counter-btn'>
            <p  className='symbol'  onClick={decrement}>-</p>
            {counter}
            <p className='symbol'  onClick={increment}>+</p>
        </div>
    )
}

export default ItemCounter;