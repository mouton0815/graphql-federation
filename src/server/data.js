export const BOOKS = {
    1: {
        id: 1,
        title: 'Fred´s first book',
        lang: 'en',
        year: 2000,
        author: 1
    },
    2: {
        id: 2,
        title: 'Fred´s second book',
        year: 2002,
        author: 1
    },
    3: {
        id: 3,
        title: 'Fred´s third book',
        author: 1
    },
    4: {
        id: 4,
        title: 'Le livre intéressant de Lars',
        lang: 'fr',
        year: 1999,
        author: 3
    }
}

export const AUTHORS = {
    1: {
        id: 1,
        name: 'Fred',
        books: [1,2,3]
    },
    2: {
        id: 2,
        name: 'Inge',
        city: 'Rome'
    },
    3: {
        id: 3,
        name: 'Lars',
        city: 'Paris',
        books: [4]
    }
}
