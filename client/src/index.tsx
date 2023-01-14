import React from 'react'
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client'
import { createRoot } from 'react-dom/client'
import { App } from './app'

const client = new ApolloClient({
    uri: 'http://localhost:4000/',
    cache: new InMemoryCache(),
})

const root = createRoot(document.getElementById('root') as HTMLElement)
root.render(
    <ApolloProvider client={client}>
       <App />
    </ApolloProvider>
)