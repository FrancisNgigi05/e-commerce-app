import React from 'react'
import './SearchBar.css'
import { Search } from 'lucide-react'

function SearchBar() {
    return (
        <div>
            <input
                id='search-bar'
                type="text"
                placeholder= '🔍     Search Product...'
            />
        </div>
    )
}

export default SearchBar
