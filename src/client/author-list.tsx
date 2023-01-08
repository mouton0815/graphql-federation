import React from 'react'
import { Link } from 'react-router-dom'
import { AuthorProps } from './author-props'

export type AuthorListProps = {
    authors: Array<AuthorProps>;
}

export const AuthorList = ({authors}: AuthorListProps): JSX.Element => {
    const items = authors.map(({id, name, city}, index: number) => (
        <li key={index}>
            <Link to={`/authors/${id}`}>{name}</Link>
            {city && <span> lives in {city}</span>}
        </li>
    ))
    return <ul>{items}</ul>
}
