import React from 'react'
import { gql, useQuery } from '@apollo/client'
import { BookTable } from './book-table'

const GET_BOOKS = gql`
    query GetBooks {
        books {
            id
            title
            year
            author {
                id
                name
            }
        }
    }
`

export const Books = (): JSX.Element => {
    const { loading, error, data } = useQuery(GET_BOOKS)
    if (loading) return <p>Loading...</p>
    if (error) return <p>Error : {error.message}</p>
    return <BookTable books={data.books} withAuthor={true} />
}
