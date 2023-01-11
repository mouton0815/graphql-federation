import React, { Fragment, useState } from 'react'
import { useMutation } from '@apollo/client'
import { CREATE_AUTHOR } from './graphql'
import './form.css'

type AuthorAddProps = {
    enableEdit: (edit: boolean) => void
}

const AuthorAddButton = ({enableEdit}: AuthorAddProps): JSX.Element => (
    <p><button onClick={() => enableEdit(true)}>Add new author</button></p>
)

type AuthorInputProps = {
    name: string
    city?: string
}

// Derives GraphQL author input from state, which in turn captures form values
const createAuthorInput = (formState: AuthorInputProps): AuthorInputProps => {
    const result: AuthorInputProps = { name: formState.name }
    if (formState.city) result.city = formState.city
    return result
}

// TODO: Switch to one useState per field
const AuthorAddPanel = ({enableEdit}: AuthorAddProps): JSX.Element => {
    const [formState, setFormState] = useState<AuthorInputProps>({ name: '', city: '' })
    const [createAuthor, { loading, error, reset }] = useMutation(CREATE_AUTHOR, {
        variables: { authorInput: createAuthorInput(formState) },
        refetchQueries: ['GetAuthors']
    })
    if (loading) return <p>Submitting...</p>
    return (
        <Fragment>
            <form className='styled-form' onSubmit={e => {
                e.preventDefault()
                createAuthor().then(() => enableEdit(false))
            }}>
                <label>Name:</label>
                <input type={'text'}
                       name={'name'}
                       value={formState.name}
                       onChange={e => setFormState({...formState, name: e.target.value})} />

                <label>City:</label>
                <input type={'text'}
                       name={'city'}
                       value={formState.city}
                       onChange={e => setFormState({...formState, city: e.target.value})} />

                <div />
                <div>
                    <button type="submit" disabled={!formState.name}>Add author</button>
                    <button className='cancel-button' onClick={() => {enableEdit(false); reset()}}>Cancel</button>
                </div>
            </form>
            {error && <p>Error: {error.message}</p>}
        </Fragment>
    )
}

export const AuthorAdd = (): JSX.Element => {
    const [ editEnabled, enableEdit ] = useState(false)
    return editEnabled
        ? <AuthorAddPanel enableEdit={enableEdit}/>
        : <AuthorAddButton enableEdit={enableEdit} />
}
