import React from 'react'
import { useQuery } from '@apollo/client'
import { AuthorTable } from './author-table'
import { AuthorAdd } from './author-add'
import { GET_AUTHORS } from './author-graphql'
import '../grid.css'

export const Authors = (): JSX.Element => {
    const { loading, error, data } = useQuery(GET_AUTHORS)
    if (loading) return <p>Loading...</p>
    if (error) return <p>Error : {error.message}</p>
    return (
        <>
            <div className='Row'>
                <h3>Authors</h3>
            </div>
            <div className='ScrollCell'>
                <AuthorTable authors={data.authors} />
            </div>
            <div className='Cell'>
                <AuthorAdd />
            </div>
        </>
    )
}
