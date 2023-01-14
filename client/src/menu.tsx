import React from 'react'
import { Link } from 'react-router-dom'
import './css/menu.css'
import './css/grid.css'

export const Menu = (): JSX.Element => (
    <div className='Row Menu'>
        <div><Link to='/'>Home</Link></div>
        <div><Link to='/books'>Books</Link></div>
        <div><Link to='/authors'>Authors</Link></div>
    </div>
)
