# GraphQL Federation with Apollo
This is an experimentation and demonstration project for GraphQL federation
with [Apollo](https://www.apollographql.com/docs/federation/).

The server part consists of two Apollo subgraph servers, one for [authors](./server-authors)
and one for [books](./server-books). Every subgraph server uses its own separated storage (currently in-memory only).
The relationships between authors and books are expressed in the local GraphQL schemas of both servers.

The GraphQL schemas exposed by both subgraph servers are composed to a federated "supergraph" schema
by Apollo's [rover](https://www.apollographql.com/docs/rover/) command line tool.
Based on the generated supergraph schema, Apollo's [router](https://www.apollographql.com/docs/router/)
forwards  GraphQL requests to the responsible server(s) and combines the results. 

A React [client](./client) connects to the router and provides a simplistic UI for the management of
authors and their books. The React UI is delivered by the [serve](https://github.com/vercel/serve) utility.

## Federation Details
Authors and books are managed by different servers, but there are relationships between them:
Every book has an author, modeled as ``authorId`` in the "books" database.
Vice versa, every author has zero or more books.
The latter relationship is _not_ modeled explicitly in the "authors" datbase.
Instead, given the ``id`` of an author, the "books" database finds all relevant books.

The selection of all books of an author is straightforward:
The ``Author`` [entity](https://www.apollographql.com/docs/federation/entities) is split between the "authors"
and the "books" schemas. The "authors" schema contains all "core" fields of an author such as id, name, and city.
The "books" GraphQL schema includes  the ``books`` field of the ``Author`` entity.
Consequently, the corresponding ``Author.books`` resolver is part of the "books" server:

| Author in the "authors" schema                                                                         | Author part in the "books" schema                                                   | Author part of the "books" resolver                                                                                  | 
|--------------------------------------------------------------------------------------------------------|-------------------------------------------------------------------------------------|----------------------------------------------------------------------------------------------------------------------|
| <pre>type Author @key(fields: "id") {<br/>  id: ID!<br/>  name: String!<br/>  city: String<br/>}</pre> | <pre>type Author @key(fields: "id") {<br/>  id: ID!<br/>  books: [Book]<br/>}</pre> | <pre>Author: {<br/>  books: (author) => {<br/>    return // all books with authorId == author.id<br/>  }<br/>}</pre> |

The selection of the author of a book is similar, but requires some more preparations.
Like ``Author``, the ``Book`` entity is also split between the "books" and "authors" schemas,
where the "books" schema contains all core fields. 
The "authors" schema provides the ``author`` part of the book. To obtain the author, the "authors" resolver
needs the ``authorId`` of the book. To instruct Apollo Federation to include the ``authorId`` into the object
passed to the resolver, it must be marked as ``@external``:

| Book in the "books" schema                                                                             | Book part in the "authors" schema                                                                                                               | Book part of the "authors" resolver                                                                          | 
|--------------------------------------------------------------------------------------------------------|-------------------------------------------------------------------------------------------------------------------------------------------------|--------------------------------------------------------------------------------------------------------------|
| <pre>type Book @key(fields: "id") {<br/>  id: ID!<br/>  title: String!<br/>  authorId: ID!<br/>}</pre> | <pre>type Book @key(fields: "id") {<br/>  id: ID!<br/>  authorId: ID! @external<br/>  author: Author! @requires(fields: "authorId")<br/>}</pre> | <pre>Book: {<br/>  author: (book) => {<br/>    return // author with id == book.authorId<br/>  }<br/>}</pre> |

Those cross-schema and cross-resolver dependencies couple the subgraph servers and require arrangements between
the involved teams.

## Preconditions
To run the services of this project, you need
* [Node.js](https://nodejs.org/en/) with npm
* Apollo [rover](https://www.apollographql.com/docs/federation/quickstart/setup)
* Apollo [router](https://www.apollographql.com/docs/router/quickstart)

Please make sure that ``rover`` and ``router`` are in your path, so that they are found by the server scripts.

## Server Setup
It is best to run the three servers in different shells.
The commands in the [router](./router) folder must be started last,
because ``rover`` needs the two subgraph servers to compose the supergraph schema.

| Shell 1                                                                         | Shell 2                                                                       | Shell 3                                                |
|---------------------------------------------------------------------------------|-------------------------------------------------------------------------------|--------------------------------------------------------|
| <pre>cd server-authors<br/>npm install<br/>npm run generate<br/>npm start</pre> | <pre>cd server-books<br/>npm install<br/>npm run generate<br/>npm start</pre> | <pre>cd router<br/>npm run compose<br/>npm start</pre> |

The router is reachable at http://localhost:4000. It runs in dev mode and exposes the
[Apollo Studio Explorer](https://www.apollographql.com/docs/graphos/explorer/explorer),
which allows to play with GraphQL queries and mutations. An example query for testing is
```graphql
query Books {
  books {
    id
    title
    year
    author {
      name
    }
  }
}
```

## Client Setup
From the project root do
```shell
cd client
npm install
npm run build
npm start
```
The frontend is reachable at http://localhost:3000