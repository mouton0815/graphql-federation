import React, {Fragment} from 'react'
import { Link, useParams } from 'react-router-dom'
import { useQuery } from '@apollo/client'
import { AuthorProps } from '../author/author-props'
import { GET_BOOK_WITH_AUTHOR } from './book-graphql'
import '../grid.css'

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
            <h3 className='Row'>{title}</h3>
            <div className='Cell'>
                {year && <p>Published in <b>{year}</b></p>}
                {author && <p>Written by <Link to={`/authors/${author.id}`}>{author.name}</Link></p>}
            </div>
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

