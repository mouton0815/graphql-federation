import { ApolloServer } from '@apollo/server'
import { startStandaloneServer } from '@apollo/server/standalone'

const typeDefs = `#graphql
    type Book {
        title: String!
        lang: String
        year: Int
        author: Author!
    }
    type Author {
        name: String!
        city: String
        books: [Book]
    }
    input AuthorInput {
        name: String
        city: String
    }
    type Query {
        getAuthor(id: ID!): Author
        getBook(id: ID!): Book
    }
    type Mutation {
        createAuthor(input: AuthorInput): Author
        updateAuthor(id: ID!, input: AuthorInput): Author
    } 
`

const BOOKS = {
    1: {
        title: 'Fred´s first book',
        lang: 'en',
        year: 2000,
        author: 1
    },
    2: {
        title: 'Fred´s second book',
        year: 2002,
        author: 1
    },
    3: {
        title: 'Book without author'
    }
}

const AUTHORS = {
    1: {
        name: 'Fred',
        books: [1,2]
    },
    2: {
        name: 'Inge',
        city: 'Rome'
    },
    3: {
        name: 'Fred',
        city: 'Paris'
    }
}

const resolvers = {
    Query: {
        getAuthor: (root, {id}) => {
            const author = AUTHORS[id]
            if (!author) {
                throw new Error(`An author with id ${id} does not exist`)
            }
            return author
        },
        getBook: (root, {id}) => {
            const book = BOOKS[id]
            if (!book) {
                throw new Error(`A book with id ${id} does not exist`)
            }
            return book
        }
    },
    Mutation: {
        createAuthor: (root, { input }) => {
            const id = Object.keys(AUTHORS).length + 1
            return AUTHORS[id] = input
        },
        updateAuthor: (root, { id, input }) => {
            let author = AUTHORS[id]
            if (!author) {
                throw new Error(`An author with id ${id} does not exist`)
            }
            return AUTHORS[id] = Object.assign({}, author, input)
        }
    },
    Author: {
        books: (author) => {
            return author.books? author.books.map(i => BOOKS[i]) : []
        }
    },
    Book: {
        author: (book) => {
            if (!book.author) {
                throw new Error(`Book '${book.title}' does not have an author`)
            }
            const author = AUTHORS[book.author]
            if (!author) {
                throw new Error(`An author with id ${book.author} does not exist`)
            }
            return author
        }
    }
}

const server = new ApolloServer({
    typeDefs,
    resolvers,
});

const { url } = await startStandaloneServer(server)
console.log(`🚀 Server ready at ${url}`)