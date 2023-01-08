import { ApolloServer } from '@apollo/server'
import { startStandaloneServer } from '@apollo/server/standalone'

const typeDefs = `#graphql
    type Book {
        id: ID!
        title: String!
        lang: String
        year: Int
        author: Author!
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
        createAuthor(input: AuthorInput): Author
        updateAuthor(id: ID!, input: AuthorInput): Author
    } 
`

const BOOKS = {
    1: {
        id: 1,
        title: 'Fred´s first book',
        lang: 'en',
        year: 2000,
        author: 1
    },
    2: {
        id: 2,
        title: 'Fred´s second book',
        year: 2002,
        author: 1
    },
    3: {
        id: 3,
        title: 'Book without author'
    },
    4: {
        id: 4,
        title: 'Lars´ interesting book',
        year: 1999,
        author: 3
    }
}

const AUTHORS = {
    1: {
        id: 1,
        name: 'Fred',
        books: [1,2]
    },
    2: {
        id: 2,
        name: 'Inge',
        city: 'Rome'
    },
    3: {
        id: 3,
        name: 'Lars',
        city: 'Paris',
        books: [4]
    }
}

const resolvers = {
    Query: {
        authors: () => {
            return Object.values(AUTHORS)
        },
        author: (root, {authorId}) => {
            console.info('---author--->', authorId)
            const author = AUTHORS[authorId]
            if (!author) {
                throw new Error(`An author with id ${authorId} does not exist`)
            }
            return author
        },
        books: () => {
            return Object.values(BOOKS)
        },
        book: (root, {bookId}) => {
            const book = BOOKS[bookId]
            if (!book) {
                throw new Error(`A book with id ${bookId} does not exist`)
            }
            return book
        }
    },
    Mutation: {
        createAuthor: (root, { input }) => {
            const id = Object.keys(AUTHORS).length + 1
            const author = Object.assign({ id }, input)
            console.info('---created author--->', author)
            return AUTHORS[id] = author
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
            console.info('---get books for--->', author)
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
    resolvers
});

const { url } = await startStandaloneServer(server)
console.log(`🚀 Server ready at ${url}`)