import React from 'react'
import { useParams } from 'react-router-dom'
import { gql, useQuery } from '@apollo/client'

const GET_AUTHOR_WITH_BOOKS = gql`
  query GetAuthorWithBooks($authorId: ID!) {
    author(authorId: $authorId) {
      name
      books {
        title
        year
      }
    }
  }
`

type BookProps = {
    title: string;
    year: number;
}

type BookTableProps = {
    name: string;
    books: Array<BookProps>;
}

const BookTable = ({name, books}: BookTableProps): JSX.Element => {
    const rows = books.map(({title, year}, index: number) => (
        <tr key={index}>
            <td>{title}</td>
            <td>{year}</td>
        </tr>
    ))
    return (
        <table className='styled-table'>
            <thead>
                <tr>
                    <th colSpan={2}>Books by {name}</th>
                </tr>
                <tr>
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

export const Books = (): JSX.Element => {
    const { authorId } = useParams()
    const { loading, error, data } = useQuery(GET_AUTHOR_WITH_BOOKS, { variables: { authorId }})
    if (loading) return <p>Loading...</p>
    if (error) return <p>Error : {error.message}</p>
    const { name, books }: BookTableProps = data.author
    return <BookTable name={name} books={books} />
}
