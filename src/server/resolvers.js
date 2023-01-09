import { AUTHORS, BOOKS } from './data.js'

export const resolvers = {
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
        createBook: (root, { input }) => {
            const bookId = Object.keys(BOOKS).length + 1
            const { authorId, ...fields } = input
            const author = AUTHORS[authorId]
            if (!author) {
                throw new Error(`An author with id ${authorId} does not exist`)
            }
            const book = Object.assign({ id: bookId, author: parseInt(authorId) }, fields)
            // TODO: How can this be done by GraphQL federation??
            if (author.books) {
                console.info('---append bookId to author.books--->', bookId, author.books)
                author.books.push(bookId)
            } else {
                author.books = [bookId]
            }
            console.info('---created book--->', book)
            return BOOKS[bookId] = book
        },
        createAuthor: (root, { input }) => {
            const authorId = Object.keys(AUTHORS).length + 1
            const author = Object.assign({ id: authorId }, input)
            console.info('---created author--->', author)
            return AUTHORS[authorId] = author
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
            console.info('---get books for author--->', author)
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