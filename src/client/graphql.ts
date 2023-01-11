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

export const GET_BOOKS = gql`
    query GetBooks {
        books {
            id
            title
            year
            author {
                id
                name
            }
        }
    }
`

export const GET_BOOK_WITH_AUTHOR = gql`
    query GetBookWithAuthor($bookId: ID!) {
        book(bookId: $bookId) {
            title
            year
            author {
                id
                name
            }
        }
    }
`

export const CREATE_BOOK = gql`
    mutation CreateBook($bookInput: BookInput) {
        createBook(input: $bookInput) {
            id
            title
            year
        }
    }
`
