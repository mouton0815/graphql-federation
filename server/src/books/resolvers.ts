import { books } from './data.js'

type BookQueryArgs = {
    bookId: string
}

type BookInput = {
    title: string
    year?: number
    authorId: string
}

type BookCreateArgs = {
    input: BookInput
}

type AuthorArg = {
    id: string
}

export const resolvers = {
    Query: {
        books: () => {
            return books
        },
        book: (_: any, { bookId }: BookQueryArgs) => {
            const book = books.find(book => book.id === bookId)
            if (!book) {
                throw new Error(`A book with id ${bookId} does not exist`)
            }
            return book
        }
    },
    Mutation: {
        createBook: (_: any, { input }: BookCreateArgs) => {
            const id = (books.length + 1).toString()
            const book = Object.assign({ id }, input)
            books.push(book)
            console.info('---created book--->', book)
            return book
        }
    },
    Author: {
        books: (author: AuthorArg) => {
            console.info('---get books for author--->', author)
            return books.filter(book => book.authorId === author.id)
        }
    }
}