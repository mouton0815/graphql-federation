import express from 'express'
import { graphqlHTTP } from 'express-graphql'
import { buildSchema } from 'graphql'

const PORT = 4000
const app = express()

const schema = buildSchema(`
    type Person {
        name: String!
        year: Int
        city: String
        spouse: Int
    }
    type Query {
        hello(id: Int!): Person
    }
`)

const persons = {
    '1': {
        name: 'Fred',
        year: 2000
    },
    '2': {
        name: 'Inge',
        city: 'Rome',
        spouse: 3
    },
    '3': {
        name: 'Fred',
        city: 'Rome',
        spouse: 2
    }
}

const rootValue = {
    hello: ({id}) => {
        const person = persons[String(id)]
        return person? person : { name: 'Not found' }
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
