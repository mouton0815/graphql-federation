import React, { Fragment, useState } from 'react'
import { gql, useMutation } from '@apollo/client'
import './form.css'

const CREATE_BOOK = gql`
    mutation CreateBook($bookInput: BookInput) {
        createBook(input: $bookInput) {
            id
            title
            year
        }
    }
`

type BookAddProps = {
    enableEdit: (edit: boolean) => void
}

const BookAddButton = ({enableEdit}: BookAddProps): JSX.Element => (
    <p><button onClick={() => enableEdit(true)}>Add new book</button></p>
)

type  BookFormProps = {
    title: string
    year?: string
    authorId: string
}

type  BookInputProps = {
    title: string
    year?: number
    authorId: number
}

// Derives GraphQL book input from state, which in turn captures form values
const createBookInput = (formState: BookFormProps): BookInputProps => {
    const result: BookInputProps = { title: formState.title, authorId: parseInt(formState.authorId) }
    if (formState.year) result.year = parseInt(formState.year)
    return result
}

const BookAddPanel = ({enableEdit}: BookAddProps): JSX.Element => {
    const [formState, setFormState] = useState<BookFormProps>({ title: '', year: '', authorId: '' })
    const [createBook, { loading, error, reset }] = useMutation(CREATE_BOOK, {
        variables: { bookInput: createBookInput(formState) },
        refetchQueries: ['GetBooks']
    })
    if (loading) return <p>Submitting...</p>
    if (error) return <p>Error : {error.message}</p>
    return (
        <Fragment>
            <form onSubmit={e => {
                e.preventDefault()
                enableEdit(false)
                createBook()
            }}>
                <label>
                    Name:
                    <input type={'text'}
                           name={'title'}
                           value={formState.title}
                           onChange={e => setFormState({...formState, title: e.target.value})} />
                </label>
                <label>
                    Year:
                    <input type={'number'}
                           name={'year'}
                           value={formState.year}
                           onChange={e => setFormState({...formState, year: e.target.value})} />
                </label>
                <label>
                    Author (ID):
                    <input type={'number'}
                           name={'authorId'}
                           value={formState.authorId}
                           onChange={e => setFormState({...formState, authorId: e.target.value})} />
                </label>
                <button type="submit" disabled={!formState.title || !formState.authorId}>Add book</button>
                <button onClick={() => {enableEdit(false); reset()}}>Cancel</button>
            </form>
        </Fragment>
    )
}

export const BookAdd = (): JSX.Element => {
    const [ editEnabled, enableEdit ] = useState(false)
    return editEnabled
        ? <BookAddPanel enableEdit={enableEdit}/>
        : <BookAddButton enableEdit={enableEdit} />
}
