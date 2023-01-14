import React from 'react'
import { useParams } from 'react-router-dom'
import { useQuery } from '@apollo/client'
import { AuthorProps } from './author-props'
import { BookArray } from '../books/book-props'
import { BookTable } from '../books/book-table'
import { GET_AUTHOR_WITH_BOOKS } from './author-graphql'
import '../css/grid.css'

type BookPanelProps = {
    name: string
    books: BookArray
}

const BookPanel = ({name, books}: BookPanelProps): JSX.Element => {
    if (books && books.length > 0) {
        return (
            <>
                <p>Books by {name}:</p>
                <BookTable books={books} withAuthor={false} />
            </>
        )
    }
    return <p>No books of {name} available.</p>
}

type AuthorWithBooksProps = AuthorProps & {
    books: BookArray
}

type AuthorPanelProps = {
    author: AuthorWithBooksProps
}

const AuthorPanel = ({author}: AuthorPanelProps): JSX.Element => {
    const {name, birth, city, books} = author
    return (
        <>
            <div className='Row'>
                <h3>{name}</h3>
            </div>
            <div className='Cell'>
                {birth && <p>{name} was born on {birth}.</p>}
                {city && <p>{name} lives in {city}.</p>}
                <BookPanel name={name} books={books} />
            </div>
        </>
    )
}

export const Author = (): JSX.Element => {
    const { authorId } = useParams()
    const { loading, error, data } = useQuery(GET_AUTHOR_WITH_BOOKS, { variables: { authorId }})
    if (loading) return <p>Loading...</p>
    if (error) return <p>Error : {error.message}</p>
    return <AuthorPanel author={data.author}/>
}
