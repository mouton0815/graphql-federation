import React from 'react'
import { useQuery } from '@apollo/client'
import { BookTable } from './book-table'
import { BookAdd } from './book-add'
import { GET_BOOKS } from './book-graphql'
import '../grid.css'

export const Books = (): JSX.Element => {
    const { loading, error, data } = useQuery(GET_BOOKS)
    if (loading) return <p>Loading...</p>
    if (error) return <p>Error : {error.message}</p>
    return (
        <>
            <div className='Row'>
                <h3>Books</h3>
            </div>
            <div className='ScrollCell'>
                <BookTable books={data.books} withAuthor={true} />
            </div>
            <div className='Cell'>
                <BookAdd />
            </div>
        </>
    )
}
