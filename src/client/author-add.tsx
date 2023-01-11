import React, { Fragment, useState } from 'react'
import { useMutation } from '@apollo/client'
import { CREATE_AUTHOR, GET_AUTHORS } from './graphql'
import './form.css'

type AuthorAddProps = {
    enableEdit: (edit: boolean) => void
}

const AuthorAddButton = ({enableEdit}: AuthorAddProps): JSX.Element => (
    <p><button onClick={() => enableEdit(true)}>Add new author</button></p>
)

type AuthorInputProps = {
    name: string
    birth?: string
    city?: string
}

// Derives GraphQL author input from state, which in turn captures form values
const createAuthorInput = (name: string, birth: string, city: string): AuthorInputProps => {
    const result: AuthorInputProps = { name }
    if (birth) result.birth = birth
    if (city) result.city = city
    return result
}

const AuthorAddPanel = ({enableEdit}: AuthorAddProps): JSX.Element => {
    const [name, setName] = useState<string>('')
    const [birth, setBirth] = useState<string>('')
    const [city, setCity] = useState<string>('')
    const [createAuthor, { loading, error, reset }] = useMutation(CREATE_AUTHOR, {
        variables: { authorInput: createAuthorInput(name, birth, city) },
        refetchQueries: [{query: GET_AUTHORS}]
    })
    if (loading) return <p>Submitting...</p>
    return (
        <Fragment>
            <form className='styled-form' onSubmit={e => {
                e.preventDefault()
                createAuthor().then(() => enableEdit(false))
            }}>
                <label>Name:</label>
                <input type={'text'} name={'name'} value={name} onChange={e => setName(e.target.value)} />

                <label>Birth (yyyy-mm-dd):</label>
                <input type={'text'} name={'birth'} value={birth} onChange={e => setBirth(e.target.value)} />

                <label>City:</label>
                <input type={'text'} name={'city'} value={city} onChange={e => setCity(e.target.value)} />

                <div />
                <div>
                    <button type="submit" disabled={!name}>Add author</button>
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
