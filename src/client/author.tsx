import React, { Fragment } from 'react'
import { useParams } from 'react-router-dom'
import { gql, useQuery } from '@apollo/client'
import { BookProps } from './book-props'
import { BookTable } from './book-table'

const GET_AUTHOR_WITH_BOOKS = gql`
  query GetAuthorWithBooks($authorId: ID!) {
    author(authorId: $authorId) {
      name
      city  
      books {
        id  
        title
        year
      }
    }
  }
`

type BookPanelProps = {
    name: string
    books: Array<BookProps>
}

const BookPanel = ({name, books}: BookPanelProps): JSX.Element => {
    if (books && books.length > 0) {
        return (
            <Fragment>
                <p>Books by {name}:</p>
                <BookTable books={books} withAuthor={false} />
            </Fragment>
        )
    }
    return <p>No books of {name} available</p>
}

type AuthorWithBooksProps = {
    name: string
    city: string
    books: Array<BookProps>
}

type AuthorPanelProps = {
    author: AuthorWithBooksProps
}

const AuthorPanel = ({author}: AuthorPanelProps): JSX.Element => {
    const {name, city, books} = author
    return (
        <Fragment>
            <h3>{name}</h3>
            {city && <p>{name} lives in <b>{city}</b></p>}
            <BookPanel name={name} books={books} />
        </Fragment>
    )
}

export const Author = (): JSX.Element => {
    const { authorId } = useParams()
    const { loading, error, data } = useQuery(GET_AUTHOR_WITH_BOOKS, { variables: { authorId }})
    if (loading) return <p>Loading...</p>
    if (error) return <p>Error : {error.message}</p>
    return <AuthorPanel author={data.author}/>
}
