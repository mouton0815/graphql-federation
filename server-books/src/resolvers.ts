import { Resolvers } from './generated/resolvers-types.js'
import { books } from './data.js'

export const resolvers : Resolvers = {
    Query: {
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
            const id = (books.length + 1).toString()
            const book = Object.assign({ id }, input)
            books.push(book)
            return book
        }
    },
    Author: {
        books: (author) => {
            return books.filter(book => book.authorId === author.id)
        }
    }
}