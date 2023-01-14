import { ApolloServer } from '@apollo/server'
import { startStandaloneServer } from '@apollo/server/standalone'
import { buildSubgraphSchema } from '@apollo/subgraph'
import { typeDefs } from './schema.js'
import { resolvers } from './resolvers.js'

const server = new ApolloServer({ schema: buildSubgraphSchema({ typeDefs, resolvers })});
const { url } = await startStandaloneServer(server, { listen: { port: 4002 }});
console.log(`Book server ready at ${url}`);