export const typeDefs = `#graphql
    type Book {
        id: ID!
        title: String!
        year: Int
        author: Author!
    }
    input BookInput {
        title: String!
        year: Int
        authorId: ID!
    }
    type Author {
        id: ID!
        name: String!
        birth: String
        city: String
        books: [Book]
    }
    input AuthorInput {
        name: String
        birth: String
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
    }
`
