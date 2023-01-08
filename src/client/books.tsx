import React from 'react'
import { gql, useQuery } from '@apollo/client'
import { BookList } from './book-list'

const GET_BOOKS = gql`
    query GetBooks {
        books {
            id
            title
            year
        }
    }
`

export const Books = (): JSX.Element => {
    const { loading, error, data } = useQuery(GET_BOOKS)
    if (loading) return <p>Loading...</p>
    if (error) return <p>Error : {error.message}</p>
    return <BookList books={data.books} />
}
