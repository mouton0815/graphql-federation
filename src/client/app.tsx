import React from 'react'
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom'
import { Authors } from './authors'
import { Author } from './author'

export const App = (): JSX.Element => (
    <BrowserRouter>
        <div>
            <p><Link to='/'>Home</Link></p>
            <Routes>
                <Route path='/' element={<Authors/>} />
                <Route path='/author/:authorId' element={<Author/>} />
            </Routes>
        </div>
    </BrowserRouter>
)
