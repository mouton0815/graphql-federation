export const books = [
    {
        id: '1',
        title: 'The Awakening',
        year: 1899,
        authorId: '1'
    },
    {
        id: '2',
        title: 'City of Glass',
        year: 1985,
        authorId: '2'
    },
    {
        id: '3',
        title: 'Oracle Night',
        year: 2003,
        authorId: '2',
    }
]

export const x_authors = [
    {
        id: '1',
        name: 'Kate Chopin',
        birth: '1850-02-08',
        city: 'St. Louis'
    },
    {
        id: '2',
        name: 'Paul Auster',
        birth: '1947-02-03',
        city: 'New York'
    }
]

const foo = () => {
    let foo = x_authors
    for (let i = 3; i <= 30; ++i) {
        foo.push({ id: i.toString(), name: i.toString( )})
    }
    return foo
}

export const authors = foo()
