import React from 'react'
import { Link, useParams } from 'react-router-dom'
import { useQuery } from '@apollo/client'
import { AuthorProps } from '../authors/author-props'
import { GET_BOOK_WITH_AUTHOR } from './book-graphql'
import '../css/grid.css'

type BookWithAuthorProps = {
    title: string
    year: number
    author: AuthorProps
}

type BookPanelProps = {
    book: BookWithAuthorProps
}

const BookPanel = ({book}: BookPanelProps): JSX.Element => {
    const {title, year, author} = book
    return (
        <>
            <div className='Row'>
                <h3>{title}</h3>
            </div>
            <div className='Cell'>
                {year && <p>Published in <b>{year}</b></p>}
                {author && <p>Written by <Link to={`/authors/${author.id}`}>{author.name}</Link></p>}
            </div>
        </>
    )
}

export const Book = (): JSX.Element => {
    const { bookId } = useParams()
    const { loading, error, data } = useQuery(GET_BOOK_WITH_AUTHOR, { variables: { bookId }})
    if (loading) return <p>Loading...</p>
    if (error) return <p>Error : {error.message}</p>
    return <BookPanel book={data.book}/>
}

