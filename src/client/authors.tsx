import React, { Fragment } from 'react'
import { useQuery } from '@apollo/client'
import { AuthorTable } from './author-table'
import { AuthorAdd } from './author-add'
import { GET_AUTHORS } from './graphql'

export const Authors = (): JSX.Element => {
    const { loading, error, data } = useQuery(GET_AUTHORS)
    if (loading) return <p>Loading...</p>
    if (error) return <p>Error : {error.message}</p>
    return (
        <Fragment>
            <AuthorTable authors={data.authors} />
            <AuthorAdd />
        </Fragment>
    )
}
