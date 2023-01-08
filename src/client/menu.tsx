import React from 'react'
import { Link } from 'react-router-dom'
import './menu.css'

export const Menu = (): JSX.Element => (
    <nav>
        <ul className={'Menu'}>
            <li><Link to='/'>Home</Link></li>
            <li><Link to='/books'>Books</Link></li>
            <li><Link to='/authors'>Authors</Link></li>
        </ul>
    </nav>
)
