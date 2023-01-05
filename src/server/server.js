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
    input PersonInput {
        name: String
        year: Int
        city: String
        spouse: Int
    }
    type Query {
        getPerson(id: ID!): Person
    }
    type Mutation {
        createPerson(input: PersonInput): Person
        updatePerson(id: ID!, input: PersonInput): Person
    } 
`)

const persons = {
    1: {
        name: 'Fred',
        year: 2000
    },
    2: {
        name: 'Inge',
        city: 'Rome',
        spouse: 3
    },
    3: {
        name: 'Fred',
        city: 'Rome',
        spouse: 2
    }
}

const rootValue = {
    getPerson: ({ id }) => {
        const person = persons[id]
        return person? person : { name: 'Not found' }
    },
    createPerson: ({ input }) => {
        const id = Object.keys(persons).length + 1
        persons[id] = input
        return input
    },
    updatePerson: ({ id, input }) => {
        let person = persons[id]
        if (person) {
            person = Object.assign({}, person, input)
            persons[id] = person
            return person
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
