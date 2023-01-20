import { authors } from './data.js'

type AuthorQueryArgs = {
    authorId: string
}

type AuthorInput = {
    name: string
    birth?: string
    city?: string
}

type AuthorCreateArgs = {
    input: AuthorInput
}

type BookArg = {
    id: string
    authorId: string
}

export const resolvers = {
    Query: {
        authors: () => {
            return authors
        },
        author: (_: any, { authorId }: AuthorQueryArgs) => {
            const author = authors.find(author => author.id === authorId)
            if (!author) {
                throw new Error(`An author with id ${authorId} does not exist`)
            }
            return author
        }
    },
    Mutation: {
        createAuthor: (_: any, { input }: AuthorCreateArgs) => {
            const id = (authors.length + 1).toString()
            const author = Object.assign({id}, input)
            authors.push(author)
            console.info('---created author--->', author)
            return author
        }
    },
    Book: {
        author: (book: BookArg) => {
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