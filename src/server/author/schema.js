import { gql } from 'graphql-tag'

export const typeDefs = gql`
    type Author @key(fields: "id") {
        id: ID!
        name: String!
        birth: String
        city: String
    }
    input AuthorInput {
        name: String
        birth: String
        city: String
    }
    type Book @key(fields: "id") {
        id: ID!
        author: Author!
    }
    type Query {
        authors: [Author]
        author(authorId: ID!): Author
    }
    type Mutation {
        createAuthor(input: AuthorInput): Author!
    }
`
