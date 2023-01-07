import React from 'react'
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom'
import { Authors } from './authors'
import { Author } from './author'

const Home = () => <h1>Home</h1>

export const App = (): JSX.Element => (
    <BrowserRouter>
        <div>
            <p><Link to='/'>Home</Link></p>
            <p><Link to='/authors'>Authors</Link></p>
            <Routes>
                <Route path='/' element={<Home/>} />
                <Route path='/authors' element={<Authors/>} />
                <Route path='/authors/:authorId' element={<Author/>} />
            </Routes>
        </div>
    </BrowserRouter>
)
