import React, { Fragment } from 'react'
import { gql, useQuery } from '@apollo/client'
import { AuthorTable } from './author-table'
import { AuthorAdd } from './author-add'

const GET_AUTHORS = gql`
    query GetAuthors {
        authors {
            id
            name
            birth
            city
        }
    }
`

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
