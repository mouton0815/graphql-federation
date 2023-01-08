import React, { Fragment, useState } from 'react'
import { gql, useMutation } from '@apollo/client'
import './form.css'

const CREATE_AUTHOR = gql`
    mutation CreateAuthor($authorInput: AuthorInput) {
        createAuthor(input: $authorInput) {
            id
            name
            city
        }
    }
`

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

const createAuthorInput = (formState: AuthorInputProps): AuthorInputProps => {
    const result: AuthorInputProps = { name: formState.name }
    if (formState.city) result.city = formState.city
    return result
}

const AuthorAddPanel = ({enableEdit}: AuthorAddProps): JSX.Element => {
    const [formState, setFormState] = useState<AuthorInputProps>({ name: '', city: '' })
    const [createAuthor, { loading, error, reset }] = useMutation(CREATE_AUTHOR, {
        variables: { authorInput: createAuthorInput(formState) },
        refetchQueries: ['GetAuthors']
    })
    if (loading) return <p>Submitting...</p>
    if (error) return <p>Error : {error.message}</p>
    return (
        <Fragment>
            <form onSubmit={e => {
                e.preventDefault()
                enableEdit(false)
                createAuthor()
            }}>
                <label>
                    Name:
                    <input type={'text'}
                           name={'name'}
                           value={formState.name}
                           onChange={e => setFormState({...formState, name: e.target.value})} />
                </label>
                <label>
                    City:
                    <input type={'text'}
                           name={'city'}
                           value={formState.city}
                           onChange={e => setFormState({...formState, city: e.target.value})} />
                </label>
                <p>
                    <button type="submit" disabled={!formState.name}>Add author</button>
                </p>
                <p>
                    <button onClick={() => {enableEdit(false); reset()}}>Cancel</button>
                </p>
            </form>
        </Fragment>
    )
}

export const AuthorAdd = (): JSX.Element => {
    const [ editEnabled, enableEdit ] = useState(false)
    return editEnabled
        ? <AuthorAddPanel enableEdit={enableEdit}/>
        : <AuthorAddButton enableEdit={enableEdit} />
}
