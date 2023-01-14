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
            if (!authors.find(author => author.id === input.authorId)) {
                throw new Error(`An author with id ${input.authorId} does not exist`)
            }
            const id = (books.length + 1).toString()
            const book = Object.assign({ id }, input)
            books.push(book)
            console.info('---created book--->', book)
            return book
        }
    },
    Book: {
        __resolveReference(book_ref){
            console.info('---resolve ref for book--->', book_ref)
            return books.find(book => book.id === book_ref.id)
        }
    },
    Author: {
        books: (author) => {
            console.info('---get books for author--->', author)
            return books.filter(book => book.authorId === author.id)
        }
    }
}