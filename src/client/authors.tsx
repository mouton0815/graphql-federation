import React from 'react'
import { gql, useQuery } from '@apollo/client'
import { AuthorList } from './author-list'

const GET_AUTHORS = gql`
    query GetAuthors {
        authors {
            id
            name
            city
        }
    }
`

export const Authors = (): JSX.Element => {
    const { loading, error, data } = useQuery(GET_AUTHORS)
    if (loading) return <p>Loading...</p>
    if (error) return <p>Error : {error.message}</p>
    return <AuthorList authors={data.authors} />
}
