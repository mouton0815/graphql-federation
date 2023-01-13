import { gql } from '@apollo/client'

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
