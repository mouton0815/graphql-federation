import React from 'react'
import { Link } from 'react-router-dom'
import { gql, useQuery } from '@apollo/client'
import './table.css'

const GET_AUTHORS = gql`
  query GetAuthors {
    authors {
      id
      name
      city
    }
  }
`

type AuthorProps = {
    id: number
    name: string
    city: string
}

type AuthorTableProps = {
    authors: Array<AuthorProps>;
}

const AuthorTable = ({authors}: AuthorTableProps): JSX.Element => {
    const rows = authors.map(({id, name, city}, index: number) => (
        <tr key={index}>
            <td>{name}</td>
            <td>{city}</td>
            <td>
                <Link to={`/authors/${id}`}>more information</Link>
            </td>
        </tr>
    ))
    return (
        <table className='styled-table'>
            <thead>
            <tr>
                <th>Name</th>
                <th>City</th>
                <th>Link</th>
            </tr>
            </thead>
            <tbody>
                {rows}
            </tbody>
        </table>
    )
}

export const Authors = (): JSX.Element => {
    const { loading, error, data } = useQuery(GET_AUTHORS)
    if (loading) return <p>Loading...</p>
    if (error) return <p>Error : {error.message}</p>
    const { authors } : AuthorTableProps = data
    return <AuthorTable authors={authors} />
}
