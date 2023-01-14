import { authors } from './data.js'

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
        }
    },
    Mutation: {
        createAuthor: (_, {input}) => {
            const id = (authors.length + 1).toString()
            const author = Object.assign({id}, input)
            authors.push(author)
            console.info('---created author--->', author)
            return author
        }
    },
    Book: {
        author: (book) => {
            // The errors below indicate bugs or data corruption:
            // * The schema does not allow to create books w/o author
            // * The existence of the author is checked on book creation
            console.info('---get author for book--->', book)
            if (!book.authorId) {
                throw new Error(`Book '${book.id}' does not have an author`)
            }
            const author = authors.find(author => author.id === book.authorId)
            if (!author) {
                throw new Error(`An author with id ${book.authorId} does not exist`)
            }
            return author
        }
    }
}