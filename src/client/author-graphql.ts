import { gql } from '@apollo/client'

export const GET_AUTHORS = gql`
    query GetAuthors {
        authors {
            id
            name
            birth
            city
        }
    }
`

export const GET_AUTHOR_WITH_BOOKS = gql`
    query GetAuthorWithBooks($authorId: ID!) {
        author(authorId: $authorId) {
            id
            name
            birth
            city
            books {
                id
                title
                year
            }
        }
    }
`

export const CREATE_AUTHOR = gql`
    mutation CreateAuthor($authorInput: AuthorInput) {
        createAuthor(input: $authorInput) {
            id
            name
            city
        }
    }
`
