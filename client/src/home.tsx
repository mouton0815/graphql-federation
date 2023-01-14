import React from 'react'
import { Link } from 'react-router-dom'
import './css/grid.css'

export const Home = (): JSX.Element => (
    <div className='Row'>
        <h3>Welcome</h3>
        <p>Have a look at our <Link to='/books'>books</Link> or visit our <Link to='/authors'>authors</Link>.</p>
    </div>
)
