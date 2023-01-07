import React from 'react'
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom'
import { Authors } from './authors'
import { Books } from './books'

export const App = (): JSX.Element => (
    <BrowserRouter>
        <div>
            <Link to='/'>Home</Link>
            <Routes>
                <Route path='/' element={<Authors/>} />
                <Route path='/books/:authorId' element={<Books/>} />
            </Routes>
        </div>
    </BrowserRouter>
)
