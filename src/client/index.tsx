import React from 'react'
import {ApolloClient, InMemoryCache, ApolloProvider, gql, useQuery} from '@apollo/client'
import { createRoot } from 'react-dom/client'
import './index.css'

const client = new ApolloClient({
    uri: 'http://localhost:4000/',
    cache: new InMemoryCache(),
})

const GET_AUTHORS = gql`
  query GetAuthors {
    authors {
      name
      city
    }
  }
`

type AuthorProps = {
    name: string;
    city: string;
}

type AuthorTableProps = {
    authors: Array<AuthorProps>;
}

const AuthorTable = ({authors}: AuthorTableProps): JSX.Element => {
    const rows = authors.map(({name, city}, index: number) => (
        <tr key={index}>
            <td>{name}</td>
            <td>{city}</td>
        </tr>
    ))
    return (
        <table className='styled-table'>
            <thead>
            <tr>
                <th>Name</th>
                <th>City</th>
            </tr>
            </thead>
            <tbody>
                {rows}
            </tbody>
        </table>
    )
}

const Authors = (): JSX.Element => {
    const { loading, error, data } = useQuery(GET_AUTHORS)
    if (loading) return <p>Loading...</p>
    if (error) return <p>Error : {error.message}</p>
    const authors : Array<AuthorProps> = data.authors
    return <AuthorTable authors={authors} />
}

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