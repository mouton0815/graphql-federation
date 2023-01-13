import React from 'react'
import { Link } from 'react-router-dom'
import { BookArray } from './book-props'
import { AuthorProps } from '../author/author-props'
import '../table.css'
import '../grid.css'

type BookTableProps = {
    books: BookArray
    withAuthor: boolean
}

type AuthorColumnProps = {
    author?: AuthorProps
}

const AuthorColumn = ({author}: AuthorColumnProps): JSX.Element => {
    if (!author) {
        return <td></td>
    }
    const { id, name } = author
    return <td><Link to={`/authors/${id}`}>{name}</Link></td>
}

export const BookTable = ({books, withAuthor}: BookTableProps): JSX.Element => {
    const rows = books.map(({id, title, year, author}, index: number) => (
        <tr key={index}>
            <td>{index + 1}</td>
            <td><Link to={`/books/${id}`}>{title}</Link></td>
            <td>{year}</td>
            {withAuthor && <AuthorColumn author={author} />}
        </tr>
    ))
    return (
        <table className='styled-table Cell'>
            <thead>
                <tr>
                    <th>#</th>
                    <th>Title</th>
                    <th>Year</th>
                    {withAuthor && <th>Author</th>}
                </tr>
            </thead>
            <tbody>
                {rows}
            </tbody>
        </table>
    )
}
