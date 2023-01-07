import React from 'react'
import { gql, useQuery } from '@apollo/client'
import './table.css'

const GET_AUTHORS = gql`
  query GetAuthors {
    authors {
      name
      city
    }
  }
`

type AuthorProps = {
    name: string;
    city: string;
}

type AuthorTableProps = {
    authors: Array<AuthorProps>;
}

const AuthorTable = ({authors}: AuthorTableProps): JSX.Element => {
    const rows = authors.map(({name, city}, index: number) => (
        <tr key={index}>
            <td>{name}</td>
            <td>{city}</td>
        </tr>
    ))
    return (
        <table className='styled-table'>
            <thead>
            <tr>
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

export const Authors = (): JSX.Element => {
    const { loading, error, data } = useQuery(GET_AUTHORS)
    if (loading) return <p>Loading...</p>
    if (error) return <p>Error : {error.message}</p>
    const authors : Array<AuthorProps> = data.authors
    return <AuthorTable authors={authors} />
}
