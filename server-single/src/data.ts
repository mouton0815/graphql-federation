import { Author, Book } from './generated/resolvers-types'

export const authors : Array<Author> = [
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
    },
    {
        id: '3',
        name: 'Jennifer Egan',
        birth: '1962-09-07',
        city: 'New York'
    },
    {
        id: '4',
        name: 'T.C. Boyle',
        birth: '1948-12-02',
        city: 'Montecito CA'
    }
]

export const books : Array<Book> = [
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
        title: 'Moon Palace',
        year: 1989,
        authorId: '2'
    },
    {
        id: '4',
        title: 'The Book of Illusions',
        year: 2002,
        authorId: '2'
    },
    {
        id: '5',
        title: 'Oracle Night',
        year: 2003,
        authorId: '2',
    },
    {
        id: '6',
        title: 'Sunset Park',
        year: 2010,
        authorId: '2',
    },
    {
        id: '7',
        title: 'A Visit from the Goon Squad',
        year: 2010,
        authorId: '3',
    },
    {
        id: '8',
        title: 'Manhattan Beach',
        year: 2017,
        authorId: '3',
    },
    {
        id: '9',
        title: 'Water Music',
        year: 1981,
        authorId: '4',
    },
    {
        id: '10',
        title: 'Drop City',
        year: 2003,
        authorId: '4',
    },
    {
        id: '11',
        title: 'Talk Talk',
        year: 2006,
        authorId: '4',
    }
]
