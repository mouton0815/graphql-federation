import React from 'react'
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client'
import { createRoot } from 'react-dom/client'
import { Authors } from './authors'
import './index.css'

const client = new ApolloClient({
    uri: 'http://localhost:4000/',
    cache: new InMemoryCache(),
})


type AppProps = {
    text: string
}

const App = ({text}: AppProps): JSX.Element => (
    <div>
        <h3>This is a test for {text}</h3>
        <Authors />
    </div>
)

const root = createRoot(document.getElementById('root') as HTMLElement)
root.render(
    <ApolloProvider client={client}>
       <App text='Foo' />
    </ApolloProvider>
)