import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Menu } from './menu'
import { Authors } from './authors/authors'
import { Author } from './authors/author'
import { Books } from './books/books'
import { Book } from './books/book'
import { Home } from './home'
import './css/body.css'
import './css/grid.css'

export const App = (): JSX.Element => (
    <BrowserRouter>
        <div className='Grid'>
            <Menu />
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
