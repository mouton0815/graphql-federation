import express from 'express'
import { graphqlHTTP } from 'express-graphql'
import { buildSchema } from 'graphql'

const PORT = 4000
const app = express()

const schema = buildSchema(`
    type Book {
        title: String!
        lang: String
        year: Int
        author: Author!
    }
    type Author {
        name: String!
        city: String
        books: [Book]
    }
    input AuthorInput {
        name: String
        city: String
    }
    type Query {
        getAuthor(id: ID!): Author
    }
    type Mutation {
        createAuthor(input: AuthorInput): Author
        updateAuthor(id: ID!, input: AuthorInput): Author
    } 
`)

const BOOKS = {
    1: {
        title: 'His first book',
        lang: 'en',
        year: 2000,
        author: 1
    },
    2: {
        title: 'His second book',
        year: 2002,
        author: 1
    }
}

const AUTHORS = {
    1: {
        name: 'Fred',
        books: [1,2]
    },
    2: {
        name: 'Inge',
        city: 'Rome'
    },
    3: {
        name: 'Fred',
        city: 'Paris'
    }
}

const rootValue = {
    getAuthor: ({ id }) => {
        let author = AUTHORS[id]
        if (!author) {
            throw new Error(`An author with id ${id} does not exist`)
        }
        if (author.books) {
            // console.log('---> before:', author.books)
            const books = author.books.map(i => BOOKS[i])
            author = Object.assign({}, author, { books }) // Reassign variable
            // console.log('---> after:', author.books)
        }
        return author
    },
    createAuthor: ({ input }) => {
        const id = Object.keys(AUTHORS).length + 1
        return AUTHORS[id] = input
    },
    updateAuthor: ({ id, input }) => {
        let author = AUTHORS[id]
        if (author) {
            return AUTHORS[id] = Object.assign({}, author, input)
        } else {
            return { name: 'Not found' }
        }
    }
}

app.use('/graph', graphqlHTTP({
    schema,
    rootValue,
    graphiql: true
}))

app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`)
})
