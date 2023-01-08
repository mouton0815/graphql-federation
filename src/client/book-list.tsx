import React from 'react'
import { Link } from 'react-router-dom'
import { BookProps } from './book-props'

type BookListProps = {
    books: Array<BookProps>
}

export const BookList = ({books}: BookListProps): JSX.Element => {
    const items = books.map(({id, title, year}, index: number) => (
        <li key={index}>
            <Link to={`/books/${id}`}>{title}</Link>
            {year && <span> published in {year}</span>}
        </li>
    ))
    return <ul>{items}</ul>
}
