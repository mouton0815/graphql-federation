import React, { Fragment, useState } from 'react'
import { useMutation } from '@apollo/client'
import { CREATE_BOOK, GET_BOOKS } from './book-graphql'
import { GET_AUTHOR_WITH_BOOKS } from '../author/author-graphql'
import { AuthorSelect } from '../author/author-select'
import '../form.css'
import '../grid.css'

type BookAddProps = {
    enableEdit: (edit: boolean) => void
}

const BookAddButton = ({enableEdit}: BookAddProps): JSX.Element => (
    <div className='Cell'>
        <button onClick={() => enableEdit(true)}>Add book</button>
    </div>
)

type BookInputProps = {
    title: string
    year?: number
    authorId: string
}

// Derives GraphQL book input from state, which in turn captures form values
const createBookInput = (title: string, year: string, authorId: string): BookInputProps => {
    const result: BookInputProps = { title, authorId }
    if (year) result.year = parseInt(year)
    return result
}

const BookAddPanel = ({enableEdit}: BookAddProps): JSX.Element => {
    const [title, setTitle] = useState<string>('')
    const [year, setYear] = useState<string>('')
    const [authorId, setAuthorId] = useState<string>('')
    const [createBook, { error, reset }] = useMutation(CREATE_BOOK, {
        variables: { bookInput: createBookInput(title, year, authorId) },
        refetchQueries: [
            { query: GET_BOOKS },
            { query: GET_AUTHOR_WITH_BOOKS, variables: { authorId }}
        ]
    })
    return (
        <div className='Cell'>
            <form className='styled-form' onSubmit={event => {
                event.preventDefault()
                createBook().then(() => enableEdit(false))
            }}>
                <label>Name:</label>
                <input type='text' name='title' value={title} onChange={e => setTitle(e.target.value)} />

                <label>Year:</label>
                <input type='number' name='year' value={year} onChange={e => setYear(e.target.value)} />

                <label>Author:</label>
                <AuthorSelect value={authorId} onChange={setAuthorId} />

                <div/>
                <div>
                    <button type='submit' disabled={!title || !authorId}>Add book</button>
                    <button className='cancel-button' onClick={() => {enableEdit(false); reset()}}>Cancel</button>
                </div>
            </form>
            {error && <p>Error: {error.message}</p>}
        </div>
    )
}

export const BookAdd = (): JSX.Element => {
    const [ editEnabled, enableEdit ] = useState<boolean>(false)
    return editEnabled
        ? <BookAddPanel enableEdit={enableEdit}/>
        : <BookAddButton enableEdit={enableEdit} />
}
