export const typeDefs = `#graphql
    type Book {
        id: ID!
        title: String!
        lang: String
        year: Int
        author: Author!
    }
    input BookInput {
        title: String!
        lang: String
        year: Int
        authorId: ID!
    }
    type Author {
        id: ID!
        name: String!
        city: String
        books: [Book]
    }
    input AuthorInput {
        name: String
        city: String
    }
    type Query {
        authors: [Author]
        author(authorId: ID!): Author
        books: [Book]
        book(bookId: ID!): Book
    }
    type Mutation {
        createBook(input: BookInput): Book!
        createAuthor(input: AuthorInput): Author!
        updateAuthor(id: ID!, input: AuthorInput): Author!
    }
`
