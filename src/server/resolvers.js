import { authors, books } from './data.js'

export const resolvers = {
    Query: {
        authors: () => {
            return authors
        },
        author: (_, { authorId }) => {
            const author = authors.find(author => author.id === authorId)
            if (!author) {
                throw new Error(`An author with id ${authorId} does not exist`)
            }
            return author
        },
        books: () => {
            return books
        },
        book: (_, { bookId }) => {
            const book = books.find(book => book.id === bookId)
            if (!book) {
                throw new Error(`A book with id ${bookId} does not exist`)
            }
            return book
        }
    },
    Mutation: {
            createBook: (_, { input }) => {
                if (!authors.find(author => author.id === input.authorId)) {
                    throw new Error(`An author with id ${input.authorId} does not exist`)
                }
                const id = (books.length + 1).toString()
                const book = Object.assign({ id }, input)
                books.push(book)
                console.info('---created book--->', book)
                return book
            },
            createAuthor: (_, { input }) => {
                const id = (authors.length + 1).toString()
                const author = Object.assign({ id }, input)
                authors.push(author)
                console.info('---created author--->', author)
                return author
            },
        },
    Author: {
        books: (author) => {
            console.info('---get books for author--->', author)
            return books.filter(book => book.authorId === author.id)
        }
    },
    Book: {
        author: (book) => {
            // The errors below indicate bugs or data corruption:
            // * The schema does not allow to create books w/o author
            // * The existence of the author is checked on book creation
            console.info('---get author for book--->', book)
            if (!book.authorId) {
                throw new Error(`Book '${book.title}' does not have an author`)
            }
            const author = authors.find(author => author.id === book.authorId)
            if (!author) {
                throw new Error(`An author with id ${book.authorId} does not exist`)
            }
            return author
        }
    }
}