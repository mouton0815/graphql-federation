import React, { Fragment } from 'react'
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
        <Fragment>
            <h3 className='Row'>Authors</h3>
            <AuthorTable authors={data.authors} />
            <AuthorAdd />
        </Fragment>
    )
}
