import React from 'react'
import { Link } from 'react-router-dom'
import { AuthorProps } from './author-props'

export type AuthorTableProps = {
    authors: Array<AuthorProps>;
}

export const AuthorTable = ({authors}: AuthorTableProps): JSX.Element => {
    const rows = authors.map(({id, name, city}, index: number) => (
        <tr key={index}>
            <td>{index + 1}</td>
            <td><Link to={`/authors/${id}`}>{name}</Link></td>
            <td>{city}</td>
        </tr>
    ))
    return (
        <table className='styled-table'>
            <thead>
                <tr>
                    <th>#</th>
                    <th>Name</th>
                    <th>City</th>
                </tr>
            </thead>
            <tbody>
                {rows}
            </tbody>
        </table>
    )
}
