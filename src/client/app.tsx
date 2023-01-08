import React from 'react'
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom'
import { Authors } from './authors'
import { Author } from './author'
import { Books } from './books'
import { Book } from './book'

const Home = () => <h1>Home</h1>

export const App = (): JSX.Element => (
    <BrowserRouter>
        <div>
            <p><Link to='/'>Home</Link></p>
            <p><Link to='/authors'>Authors</Link></p>
            <p><Link to='/books'>Books</Link></p>
            <Routes>
                <Route path='/' element={<Home/>} />
                <Route path='/authors' element={<Authors/>} />
                <Route path='/authors/:authorId' element={<Author/>} />
                <Route path='/books' element={<Books/>} />
                <Route path='/books/:bookId' element={<Book/>} />
            </Routes>
        </div>
    </BrowserRouter>
)
