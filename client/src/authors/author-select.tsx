import React, { Dispatch, SetStateAction } from 'react'
import { useQuery } from '@apollo/client'
import { GET_AUTHORS } from './author-graphql'
import { AuthorArray } from "./author-props";
import '../css/form.css'

type AuthorSelectProps = {
    value: string
    onChange: Dispatch<SetStateAction<string>>
}

// Select an author from an up-front selected author list and pass its id to the callback.
// Can later be changed to a search-as-you type widget with Apollo's useLazyQuery hook.
export const AuthorSelect = ({ value, onChange }: AuthorSelectProps): JSX.Element => {
    const { loading, error, data } = useQuery(GET_AUTHORS)
    if (loading) return <p>Loading...</p>
    if (error) return <p>Error : {error.message}</p>
    const authors : AuthorArray = data.authors
    const options = authors.map(({ id, name }) => <option key={id} value={id}>{name}</option>)
    return (
        <select value={value} onChange={event => onChange(event.target.value)}>
            <option key={0} value={''}>---</option>
            {options}
        </select>
    )
}