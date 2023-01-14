import { books } from './data.js'

export const resolvers = {
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
            console.info('---created book--->', book)
            return book
        }
    },
    Author: {
        books: (author) => {
            console.info('---get books for author--->', author)
            return books.filter(book => book.authorId === author.id)
        }
    }
}