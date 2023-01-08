import React from 'react'
import { Link } from 'react-router-dom'
import { BookProps } from './book-props'
import './table.css'

type BookTableProps = {
    books: Array<BookProps>
}

export const BookTable = ({books}: BookTableProps): JSX.Element => {
    const rows = books.map(({id, title, year}, index: number) => (
        <tr key={index}>
            <td>{index + 1}</td>
            <td><Link to={`/books/${id}`}>{title}</Link></td>
            <td>{year}</td>
        </tr>
    ))
    return (
        <table className='styled-table'>
            <thead>
                <tr>
                    <th>#</th>
                    <th>Title</th>
                    <th>Year</th>
                </tr>
            </thead>
            <tbody>
                {rows}
            </tbody>
        </table>
    )
}
