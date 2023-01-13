import React from 'react'
import { Link } from 'react-router-dom'
import { AuthorArray } from './author-props'
import '../table.css'
import '../grid.css'

export type AuthorTableProps = {
    authors: AuthorArray
}

export const AuthorTable = ({authors}: AuthorTableProps): JSX.Element => {
    const rows = authors.map(({id, name, birth, city}, index: number) => (
        <tr key={index}>
            <td>{index + 1}</td>
            <td><Link to={`/authors/${id}`}>{name}</Link></td>
            <td>{birth}</td>
            <td>{city}</td>
        </tr>
    ))
    return (
        <table className='styled-table Cell'>
            <thead>
            <tr>
                <th>#</th>
                <th>Name</th>
                <th>Birth</th>
                <th>City</th>
            </tr>
            </thead>
            <tbody>
            {rows}
            </tbody>
        </table>
    )
}
