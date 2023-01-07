import React, { Fragment } from 'react'
import { useParams } from 'react-router-dom'
import { gql, useQuery } from '@apollo/client'
import { BookTable } from './book-table'

const GET_AUTHOR_WITH_BOOKS = gql`
  query GetAuthorWithBooks($authorId: ID!) {
    author(authorId: $authorId) {
      name
      city  
      books {
        title
        year
      }
    }
  }
`

type BookProps = {
    title: string
    year: number
}

type AuthorProps = {
    name: string
    city: string
    books: Array<BookProps>
}

export const Author = (): JSX.Element => {
    const { authorId } = useParams()
    const { loading, error, data } = useQuery(GET_AUTHOR_WITH_BOOKS, { variables: { authorId }})
    if (loading) return <p>Loading...</p>
    if (error) return <p>Error : {error.message}</p>
    const { name, city, books }: AuthorProps = data.author
    return (
        <Fragment>
            <h3>{name}</h3>
            {city && <p>Lives in <b>{city}</b></p>}
            {books && books.length > 0 && <BookTable books={books} />}
        </Fragment>
    )
}
