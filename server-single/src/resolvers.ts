import { Resolvers } from './generated/resolvers-types.js'
import { authors, books } from './data.js'

export const resolvers : Resolvers = {
    Query: {
        authors: () => { return authors },
        books: () => { return books }
    },
    Author: {
        books: (author) => {
            return books.filter(book => book.authorId === author.id)
        }
    },
    Book: {
        author: (book) => {
            return authors.find(author => author.id === book.authorId) || null
        }
    }
}