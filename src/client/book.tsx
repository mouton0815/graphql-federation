import React, {Fragment} from 'react'
import { Link, useParams } from 'react-router-dom'
import { useQuery } from '@apollo/client'
import { AuthorProps } from './author-props'
import { GET_BOOK_WITH_AUTHOR } from './book-graphql'

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
        <Fragment>
            <h3>{title}</h3>
            {year && <p>Published in <b>{year}</b></p>}
            {author && <p>Written by <Link to={`/authors/${author.id}`}>{author.name}</Link></p>}
        </Fragment>
    )
}

export const Book = (): JSX.Element => {
    const { bookId } = useParams()
    const { loading, error, data } = useQuery(GET_BOOK_WITH_AUTHOR, { variables: { bookId }})
    if (loading) return <p>Loading...</p>
    if (error) return <p>Error : {error.message}</p>
    return <BookPanel book={data.book}/>
}

