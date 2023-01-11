import React, { Fragment } from 'react'
import { useQuery } from '@apollo/client'
import { BookTable } from './book-table'
import { BookAdd } from './book-add'
import { GET_BOOKS } from './graphql'

export const Books = (): JSX.Element => {
    const { loading, error, data } = useQuery(GET_BOOKS)
    if (loading) return <p>Loading...</p>
    if (error) return <p>Error : {error.message}</p>
    return (
        <Fragment>
            <BookTable books={data.books} withAuthor={true} />
            <BookAdd />
        </Fragment>
    )
}
