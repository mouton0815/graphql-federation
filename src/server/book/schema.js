import { gql } from 'graphql-tag'

export const typeDefs = gql`
    type Book @key(fields: "id") {
        id: ID!
        title: String!
        year: Int
    }
    input BookInput {
        title: String!
        year: Int
        authorId: ID!
    }
    type Author @key(fields: "id") {
        id: ID!
        books: [Book]
    }
    type Query {
        books: [Book]
        book(bookId: ID!): Book
    }
    type Mutation {
        createBook(input: BookInput): Book!
    }
`
