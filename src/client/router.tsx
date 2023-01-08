import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Menu } from './menu'
import { Authors } from './authors'
import { Author } from './author'
import { Books } from './books'
import { Book } from './book'
import { Home } from './home'

export const Router = (): JSX.Element => (
    <BrowserRouter>
        <Menu />
        <Routes>
            <Route path='/' element={<Home/>} />
            <Route path='/authors' element={<Authors/>} />
            <Route path='/authors/:authorId' element={<Author/>} />
            <Route path='/books' element={<Books/>} />
            <Route path='/books/:bookId' element={<Book/>} />
        </Routes>
    </BrowserRouter>
)
